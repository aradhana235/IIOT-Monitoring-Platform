package com.enterprise.iiot.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enterprise.iiot.model.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, UUID> {

}