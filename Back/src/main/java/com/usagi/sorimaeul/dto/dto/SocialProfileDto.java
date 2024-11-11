package com.usagi.sorimaeul.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.oauth2.client.registration.ClientRegistration;

import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialProfileDto {

    private Map<String, Object> attributes;

    public long getProviderId(ClientRegistration provider) {
        String providerName = provider.getClientName();
        if (providerName.equalsIgnoreCase("kakao")) {
            return Long.parseLong(String.valueOf(attributes.get("id")));
        } else if (providerName.equalsIgnoreCase("google")) {
            return Long.parseLong(String.valueOf(attributes.get("sub")).substring(5));
        }

        return 0;
    }

}
