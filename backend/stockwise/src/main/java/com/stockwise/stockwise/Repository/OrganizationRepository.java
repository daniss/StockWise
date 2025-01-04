package com.stockwise.stockwise.Repository;

import com.stockwise.stockwise.Model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Integer> {
}
