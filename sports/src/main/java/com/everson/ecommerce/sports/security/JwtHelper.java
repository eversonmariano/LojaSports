package com.everson.ecommerce.sports.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.function.Function;

public class JwtHelper {

    public static final long JWT_EXPIRATION_TIME = 5 * 60 * 60;

    private String secret = "ads5dsa456dsa658798weas3wq1";

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    private <T> getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getUsernameFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getClaimsFromToken(String token) {
        Key hmacKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA1");
        return Jwts.parserBuilder()
                .setSigningKey(hmacKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

    }
}
