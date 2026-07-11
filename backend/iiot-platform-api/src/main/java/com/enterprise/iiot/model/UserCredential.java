package com.enterprise.iiot.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_credentials")
public class UserCredential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private AppUser user;


    @Column(name = "password_hash", nullable = false)
    private String passwordHash;


    @Column(name = "failed_attempts", nullable = false)
    private Integer failedAttempts = 0;


    @Column(name = "account_locked", nullable = false)
    private Boolean accountLocked = false;


    @Column(name = "password_updated_at")
    private LocalDateTime passwordUpdatedAt;


    @PrePersist
    public void prePersist() {
        passwordUpdatedAt = LocalDateTime.now();
    }


    // Getters and Setters

    public Long getId() {
        return id;
    }


    public AppUser getUser() {
        return user;
    }


    public void setUser(AppUser user) {
        this.user = user;
    }


    public String getPasswordHash() {
        return passwordHash;
    }


    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }


    public Integer getFailedAttempts() {
        return failedAttempts;
    }


    public void setFailedAttempts(Integer failedAttempts) {
        this.failedAttempts = failedAttempts;
    }


    public Boolean getAccountLocked() {
        return accountLocked;
    }


    public void setAccountLocked(Boolean accountLocked) {
        this.accountLocked = accountLocked;
    }


    public LocalDateTime getPasswordUpdatedAt() {
        return passwordUpdatedAt;
    }
}