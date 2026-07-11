package com.enterprise.iiot.repository;

import com.enterprise.iiot.model.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findTopByUserIdOrderByCreatedAtDesc(Long userId);

}