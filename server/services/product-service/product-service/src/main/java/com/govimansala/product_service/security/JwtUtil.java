package com.govimansala.product_service.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")  // Use the same property name
    private String secretKey;

    private final Key signingKey;

    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = secretKey;
        this.signingKey = getSignKey();
        System.out.println("JwtUtil initialized with secret key");
    }

    public Long extractUserId(String token) {
        try {
            Claims claims = extractAllClaims(token);
            Object id = claims.get("userId");
            if (id instanceof Integer) return ((Integer) id).longValue();
            if (id instanceof Long) return (Long) id;
            return null;
        } catch (Exception e) {
            System.out.println("Error extracting user ID: " + e.getMessage());
            return null;
        }
    }

    private Claims extractAllClaims(String token) {
        try {
            String cleanToken = removeBearerPrefix(token);
            return Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(cleanToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("JWT token expired", e);
        } catch (UnsupportedJwtException e) {
            throw new RuntimeException("Unsupported JWT token", e);
        } catch (MalformedJwtException e) {
            throw new RuntimeException("Invalid JWT token", e);
        } catch (SignatureException e) {
            throw new RuntimeException("JWT signature validation failed", e);
        } catch (Exception e) {
            throw new RuntimeException("JWT validation error", e);
        }
    }

    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            System.out.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }

    private Key getSignKey() {
        // Use RAW bytes like auth-service (no Base64 encoding)
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    private String removeBearerPrefix(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return token;
    }
}