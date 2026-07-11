//package com.enterprise.iiot.service;
//
//import com.enterprise.iiot.dto.LoginRequest;
//import com.enterprise.iiot.dto.LoginResponse;
//import com.enterprise.iiot.model.AppUser;
//import com.enterprise.iiot.model.UserCredential;
//import com.enterprise.iiot.repository.AppUserRepository;
//import com.enterprise.iiot.repository.UserCredentialRepository;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthService {
//
//
//    private final AppUserRepository appUserRepository;
//    private final UserCredentialRepository userCredentialRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtService jwtService;
//
//    public AuthService(
//            AppUserRepository appUserRepository,
//            UserCredentialRepository userCredentialRepository,
//            PasswordEncoder passwordEncoder,
//            JwtService jwtService
//    ) {
//
//        this.appUserRepository = appUserRepository;
//        this.userCredentialRepository = userCredentialRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtService = jwtService;
//    }
//
//
//    public LoginResponse login(LoginRequest request) {
//
//
//        AppUser user = appUserRepository
//                .findByEmail(request.getEmail())
//                .orElseThrow(() ->
//                        new RuntimeException("User not found")
//                );
//
//
//        UserCredential credential =
//                userCredentialRepository
//                        .findByUserId(user.getId())
//                        .orElseThrow(() ->
//                                new RuntimeException("Credentials not found")
//                        );
//
//
//        boolean passwordMatch =
//                passwordEncoder.matches(
//                        request.getPassword(),
//                        credential.getPasswordHash()
//                );
//
//
//        if(!passwordMatch){
//            throw new RuntimeException("Invalid password");
//        }
//
//
//        String token =
//                jwtService.generateToken(user.getEmail());
//
//
//        return new LoginResponse(
//                "Login successful",
//                user.getId(),
//                user.getEmail(),
//                token
//        );
//    }
//
//}

package com.enterprise.iiot.service;

import com.enterprise.iiot.dto.LoginRequest;
import com.enterprise.iiot.dto.LoginResponse;
import com.enterprise.iiot.model.AppUser;
import com.enterprise.iiot.model.UserCredential;
import com.enterprise.iiot.repository.AppUserRepository;
import com.enterprise.iiot.repository.UserCredentialRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final UserCredentialRepository userCredentialRepository;
    private final PasswordEncoder passwordEncoder;

    private final OtpService otpService;
    private final EmailService emailService;
    private final JwtService jwtService;

    public AuthService(
            AppUserRepository appUserRepository,
            UserCredentialRepository userCredentialRepository,
            PasswordEncoder passwordEncoder,
            OtpService otpService,
            EmailService emailService,
            JwtService jwtService
    ) {

        this.appUserRepository = appUserRepository;
        this.userCredentialRepository = userCredentialRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpService = otpService;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        AppUser user = appUserRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        UserCredential credential =
                userCredentialRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException("Credentials not found")
                        );

        boolean passwordMatch =
                passwordEncoder.matches(
                        request.getPassword(),
                        credential.getPasswordHash()
                );

        if (!passwordMatch) {
            throw new RuntimeException("Invalid password");
        }

        // Generate OTP
        String otp = otpService.generateOtp(user.getId());

        // Send OTP to Email
        emailService.sendOtp(user.getEmail(), otp);

        return new LoginResponse(
                "OTP sent successfully",
                user.getId(),
                user.getEmail(),
                null
        );
    }
    public LoginResponse verifyOtp(Long userId, String otp) {

        otpService.verifyOtp(userId, otp);

        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                "Login Successful",
                user.getId(),
                user.getEmail(),
                token
        );
    }
    
    public void resendOtp(Long userId) {

        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Generate New OTP
        String otp = otpService.generateOtp(userId);

        // Send Mail
        emailService.sendOtp(user.getEmail(), otp);
    }
}	