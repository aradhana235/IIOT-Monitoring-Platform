//package com.enterprise.iiot.service;
//
//import com.enterprise.iiot.model.OtpVerification;
//import com.enterprise.iiot.repository.OtpRepository;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.Random;
//
//@Service
//public class OtpService {
//
//    private final OtpRepository otpRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public OtpService(
//            OtpRepository otpRepository,
//            PasswordEncoder passwordEncoder
//    ) {
//        this.otpRepository = otpRepository;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    public String generateOtp(Long userId) {
//
//        String otp = String.format("%06d",
//                new Random().nextInt(1000000));
//
//        OtpVerification verification = new OtpVerification();
//OtpVerification verification =new OtpVerification();
//        verification.setUserId(userId);
//        verification.setOtpHash(passwordEncoder.encode(otp));
//        verification.setExpiryTime(LocalDateTime.now().plusMinutes(5));
//        verification.setAttempts(0);
//        verification.setVerified(false);
//
//        otpRepository.save(verification);
//
//        return otp;
//    }
//}

package com.enterprise.iiot.service;

import com.enterprise.iiot.model.OtpVerification;
import com.enterprise.iiot.repository.OtpRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;

    public OtpService(OtpRepository otpRepository,
                      PasswordEncoder passwordEncoder) {

        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String generateOtp(Long userId) {

        String otp = String.format("%06d",
                new Random().nextInt(1000000));

        OtpVerification verification = new OtpVerification();

        verification.setUserId(userId);
        verification.setOtpHash(passwordEncoder.encode(otp));
        verification.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        verification.setAttempts(0);
        verification.setVerified(false);

        otpRepository.save(verification);

        System.out.println("Generated OTP = " + otp);
        return otp;
    }

    public boolean verifyOtp(Long userId, String otp) {

        OtpVerification verification =
                otpRepository
                        .findTopByUserIdOrderByCreatedAtDesc(userId)
                        .orElseThrow(() ->
                                new RuntimeException("OTP not found"));

        if (verification.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }

        boolean matched =
                passwordEncoder.matches(
                        otp,
                        verification.getOtpHash());

        if (!matched) {
            throw new RuntimeException("Invalid OTP");
        }

        verification.setVerified(true);
        otpRepository.save(verification);

        return true;
    }
}