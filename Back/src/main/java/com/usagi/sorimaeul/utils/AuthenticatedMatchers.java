package com.usagi.sorimaeul.utils;

public class AuthenticatedMatchers {

    private AuthenticatedMatchers() {}

    public static final String[] matcherArray = {
            "/",
            "/oauth/code/**",
            "/oauth/login/**",
            "/oauth/logout",
            "/oauth/reissue",
            "/sse/**",
            "/cover/save/**",
            "/dub/save",
            "/notify/send",
            "/api-docs",
            "/api-docs/json",
            "/v3/**",
            "/v3/api-docs/**",
            "/swagger-ui/index.html",
            "/swagger-ui/**",
            "/api-docs/**",
            "/swagger-ui.html",
            "/cover/check/**",
            "/dub/check/**",
            "/model/check/**"
    };

}
