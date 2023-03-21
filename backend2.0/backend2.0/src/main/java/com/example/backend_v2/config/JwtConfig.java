package com.example.backend_v2.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public JwtTokenUtil jwtTokenUtil() {
        return new JwtTokenUtil(secret);
    }
}
