//package com.enterprise.iiot.service;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//
//@Service
//public class JwtService {
//
//
//    private final String SECRET_KEY =
//            "iiot-enterprise-secret-key-2026";
//
//
//    public String generateToken(String email) {
//
//
//        return Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(new Date())
//                .setExpiration(
//                        new Date(
//                                System.currentTimeMillis()
//                                        + 1000 * 60 * 60
//                        )
//                )
//                .signWith(
//                        SignatureAlgorithm.HS256,
//                        SECRET_KEY
//                )
//                .compact();
//
//    }
//
//}
//
//package com.enterprise.iiot.service;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.util.Date;
//
//@Service
//public class JwtService {
//
//
//    private final String SECRET =
//            "iiot-enterprise-secret-key-2026-very-long-secret";
//
//
//    private final SecretKey key =
//            Keys.hmacShaKeyFor(
//                    SECRET.getBytes()
//            );
//
//
//    public String generateToken(String email) {
//
//
//        return Jwts.builder()
//                .subject(email)
//                .issuedAt(new Date())
//                .expiration(
//                        new Date(
//                                System.currentTimeMillis()
//                                + 1000 * 60 * 60
//                        )
//                )
//                .signWith(key)
//                .compact();
//    }
//
//}

package com.enterprise.iiot.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "iiot-enterprise-secret-key-2026-very-long-secret";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    // Generate JWT Token
    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
                .signWith(key)
                .compact();
    }

    // Extract all claims
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Extract username(email)
    public String extractUsername(String token) {

        return extractAllClaims(token).getSubject();
    }

    // Validate token
    public boolean validateToken(String token, String email) {

        String username = extractUsername(token);

        return username.equals(email)
                && extractAllClaims(token)
                        .getExpiration()
                        .after(new Date());
    }
}