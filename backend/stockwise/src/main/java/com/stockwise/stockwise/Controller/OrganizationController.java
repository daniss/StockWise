package com.stockwise.stockwise.Controller;

import com.stockwise.stockwise.Model.Organization;
import com.stockwise.stockwise.Service.OrganizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("organization")
public class OrganizationController {
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PostMapping
    public ResponseEntity<Organization> createOrganization(@RequestBody Organization organization) {
        if (organization == null) {
            return ResponseEntity.badRequest().build();
        }
        Organization newOrganization = organizationService.createOrganization(organization);
        if (newOrganization == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(organization);
    }

    @PutMapping
    public ResponseEntity<Organization> updateOrganization(@RequestBody Organization organization) {
        if (organization == null) {
            return ResponseEntity.badRequest().build();
        }
        Organization updatedOrganization = organizationService.updateOrganization(organization);
        if (updatedOrganization == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(updatedOrganization);
    }

}
