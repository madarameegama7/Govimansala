package com.govimansala.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {

    // Make it static to avoid CGLIB interception; create a fresh builder so it can't be "already built"
    @Bean(name = "springSecurityFilterChain")
    public static SecurityWebFilterChain springSecurityFilterChain() {
        ServerHttpSecurity http = ServerHttpSecurity.http(); // fresh builder

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(ex -> ex
                        .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .pathMatchers(
                                "/api/auth/**",
                                "/api/product/**",
                                "/api/product/farmer_product/**",
                                "/api/order/**",
                                "/api/admin/farmers/**",
                                "/api/admin/buyers/**",
                                "/api/admin/vendors/**",
                                "/api/admin/drivers/**",
                                "/api/vendors/**",
                                "/actuator/**",
                                "/api/product/buyer_product/**",
                                "/api/buyer-order/**",
                                "/api/buyer-cart/**",
                                "/api/payhere"
                        ).permitAll()
                        .anyExchange().authenticated()
                )
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .build();
    }
}
