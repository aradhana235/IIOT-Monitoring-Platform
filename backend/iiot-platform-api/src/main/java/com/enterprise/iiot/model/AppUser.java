package com.enterprise.iiot.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "app_users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private UUID uuid;


    @Column(name = "first_name", nullable = false)
    private String firstName;


    @Column(name = "last_name")
    private String lastName;


    @Column(nullable = false, unique = true)
    private String email;


    private String mobile;


    @Column(nullable = false)
    private String status = "ACTIVE";


    @Column(name = "email_verified")
    private Boolean emailVerified = false;


    @Column(name = "created_at")
    private LocalDateTime createdAt;


    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @PrePersist
    public void prePersist() {

        if(uuid == null){
            uuid = UUID.randomUUID();
        }

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }


    @PreUpdate
    public void preUpdate() {

        updatedAt = LocalDateTime.now();

    }


    // getters and setters


    public Long getId() {
        return id;
    }


    public UUID getUuid() {
        return uuid;
    }


    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }


    public String getFirstName() {
        return firstName;
    }


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getLastName() {
        return lastName;
    }


    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getMobile() {
        return mobile;
    }


    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }


    public Boolean getEmailVerified() {
        return emailVerified;
    }


    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}