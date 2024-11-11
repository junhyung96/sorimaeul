package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.OAuthTokenDto;
import com.usagi.sorimaeul.dto.dto.SocialProfileDto;
import com.usagi.sorimaeul.dto.response.TokenResponse;
import com.usagi.sorimaeul.entity.BlackList;
import com.usagi.sorimaeul.entity.RefreshToken;
import com.usagi.sorimaeul.repository.BlackListRepository;
import com.usagi.sorimaeul.repository.RefreshTokenRepository;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class OAuthService {

    private static final String BEARER_TYPE = "Bearer";

    private final InMemoryClientRegistrationRepository inMemoryRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final RefreshTokenRepository refreshTokenRepository;

    private final BlackListRepository blackListRepository;

    public URI getCode(String providerName) throws URISyntaxException {
        ClientRegistration provider = inMemoryRepository.findByRegistrationId(providerName);

        String uri = provider.getProviderDetails().getAuthorizationUri()
                + "?response_type=code&redirect_uri="
                + provider.getRedirectUri()
                + "&client_id="
                + provider.getClientId()
                + "&scope=openid";
        return new URI(uri);
    }

    public TokenResponse login(String providerName, String code) {
        ClientRegistration provider = inMemoryRepository.findByRegistrationId(providerName);

        OAuthTokenDto token = getToken(code, provider);

        long userCode = getUserProfile(token, provider);

        RefreshToken refreshToken = refreshTokenRepository.findByUserCode(userCode);

        if (refreshToken != null) {
            String ref = refreshToken.getRefreshToken();

            BlackList blackList = BlackList.builder()
                    .token(ref)
                    .expiration(jwtTokenProvider.getExpiration(ref))
                    .build();

            blackListRepository.save(blackList);
            refreshTokenRepository.deleteById(ref);
        }

        return createToken(userCode);
    }

    private TokenResponse createToken(long userCode) {
        String accessToken = jwtTokenProvider.createAccessToken(String.valueOf(userCode));
        String refreshToken = jwtTokenProvider.createRefreshToken();

        RefreshToken token = RefreshToken.builder()
                .userCode(userCode)
                .refreshToken(refreshToken)
                .build();

        refreshTokenRepository.save(token);

        return TokenResponse.builder()
                .tokenType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private OAuthTokenDto getToken(String code, ClientRegistration provider) {
        return WebClient.create()
                .post()
                .uri(provider.getProviderDetails().getTokenUri())
                .headers(header -> {
                    header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                    header.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
                })
                .bodyValue(tokenRequest(code, provider))
                .retrieve()
                .bodyToMono(OAuthTokenDto.class)
                .block();
    }

    private MultiValueMap<String, String> tokenRequest(String code, ClientRegistration provider) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("code", code);
        formData.add("grant_type", "authorization_code");
        formData.add("redirect_uri", provider.getRedirectUri());
        formData.add("client_secret", provider.getClientSecret());
        formData.add("client_id", provider.getClientId());
        return formData;
    }

    private long getUserProfile(OAuthTokenDto token, ClientRegistration provider) {
        Map<String, Object> userAttributes = getUserAttributes(provider, token);
        SocialProfileDto profile = new SocialProfileDto(userAttributes);

        return profile.getProviderId(provider);
    }

    private Map<String, Object> getUserAttributes(ClientRegistration provider, OAuthTokenDto token) {
        return WebClient.create()
                .get()
                .uri(provider.getProviderDetails().getUserInfoEndpoint().getUri())
                .headers(header -> header.setBearerAuth(token.getAccess_token()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();
    }

    public TokenResponse reissue(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findById(refreshToken)
                .orElse(null);

        if (token == null) {
            return null;
        }

        if (!jwtTokenProvider.validateToken(token.getRefreshToken())) {
            return null;
        }

        long userCode = token.getUserCode();

        refreshTokenRepository.deleteById(refreshToken);

        BlackList blackList = BlackList.builder()
                .token(refreshToken)
                .expiration(jwtTokenProvider.getExpiration(refreshToken))
                .build();

        blackListRepository.save(blackList);

        return createToken(userCode);
    }

    public void logout(String accessToken, String refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);

        if (jwtTokenProvider.validateToken(accessToken)) {
            BlackList access = BlackList.builder()
                    .token(accessToken)
                    .expiration(jwtTokenProvider.getExpiration(accessToken))
                    .build();

            blackListRepository.save(access);
        }

        if (jwtTokenProvider.validateToken(refreshToken)) {
            BlackList refresh = BlackList.builder()
                    .token(refreshToken)
                    .expiration(jwtTokenProvider.getExpiration(refreshToken))
                    .build();

            blackListRepository.save(refresh);
        }
    }

}
