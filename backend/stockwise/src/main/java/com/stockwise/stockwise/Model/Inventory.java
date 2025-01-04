package com.stockwise.stockwise.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private Product product_id;
    private Integer quantity;
    private Integer threshold;
    @ManyToOne
    @JoinColumn(name = "supplier")
    private Supplier supplier_id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date last_updated;
    @ManyToOne
    @JoinColumn(name = "organization")
    private Organization organization;


    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization_id(Organization organization) {
        this.organization = organization;
    }

    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        last_updated = new Date();
    }

    public Inventory() {
    }

    public Inventory(Integer id,
                     Product product_id,
                     Integer quantity,
                     Integer threshold,
                     Supplier supplier_id,
                     Date last_updated,
                     Organization organization) {
        this.id = id;
        this.organization = organization;
        this.product_id = product_id;
        this.quantity = quantity;
        this.threshold = threshold;
        this.supplier_id = supplier_id;
        this.last_updated = last_updated;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Product getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Product product_id) {
        this.product_id = product_id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(Integer threshold) {
        this.threshold = threshold;
    }

    public Supplier getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(Supplier supplier_id) {
        this.supplier_id = supplier_id;
    }

    public Date getLast_updated() {
        return last_updated;
    }

    public void setLast_updated(Date last_updated) {
        this.last_updated = last_updated;
    }

}
