package com.stockwise.stockwise.Service;

import com.stockwise.stockwise.Model.Organization;
import com.stockwise.stockwise.Repository.OrganizationRepository;
import org.springframework.stereotype.Service;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Organization createOrganization(Organization organization) {
        return organizationRepository.save(organization);
    }

    public Organization updateOrganization(Organization organization) {
        return organizationRepository.save(organization);
    }
}
