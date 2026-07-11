package com.enterprise.iiot;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestPassword {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String password = "alphacore@123";

        String hash = encoder.encode(password);

        System.out.println(hash);
    }
}