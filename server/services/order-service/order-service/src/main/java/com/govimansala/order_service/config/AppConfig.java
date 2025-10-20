package com.govimansala.order_service.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    @Bean("lbRestTemplate")
    @LoadBalanced
    public RestTemplate lbRestTemplate() {
        return new RestTemplate();
    }

    @Bean("plainRestTemplate")
    public RestTemplate plainRestTemplate() {
        return new RestTemplate();
    }
}
