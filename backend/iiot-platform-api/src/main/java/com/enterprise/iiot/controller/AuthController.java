package com.enterprise.iiot.controller;

import com.enterprise.iiot.dto.LoginRequest;
import com.enterprise.iiot.dto.LoginResponse;
import com.enterprise.iiot.dto.VerifyOtpRequest;
import com.enterprise.iiot.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {

        LoginResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<LoginResponse> verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        LoginResponse response =
                authService.verifyOtp(
                        request.getUserId(),
                        request.getOtp());

        return ResponseEntity.ok(response);
    }
    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(
            @RequestParam Long userId
    ) {

        authService.resendOtp(userId);

        return ResponseEntity.ok("OTP Sent Successfully");
    }

}