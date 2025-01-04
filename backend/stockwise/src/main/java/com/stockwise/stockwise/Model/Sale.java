package com.stockwise.stockwise.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String customerName;
    private LocalDate date;
    private Double amount;
    @ManyToOne
    @JoinColumn(name = "inventory")
    private Inventory inventoryId;
    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductMoved> productIds = new ArrayList<>();
    private Status status;

    public Inventory getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(Inventory inventoryId) {
        this.inventoryId = inventoryId;
    }

    public List<ProductMoved> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<ProductMoved> productIds) {
        this.productIds = productIds;
    }

    public Sale() {
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Sale(Integer id, Inventory inventoryId, List<ProductMoved> productIds, Double amount, LocalDate date, String customerName) {
        this.customerName = customerName;
        this.id = id;
        this.inventoryId = inventoryId;
        this.productIds = productIds;
        this.amount = amount;
        this.date = date;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Inventory getInventory_id() {
        return inventoryId;
    }

    public void setInventory_id(Inventory inventoryId) {
        this.inventoryId = inventoryId;
    }

    public List<ProductMoved> getProductSold_ids() {
        return productIds;
    }

    public void setProductSold_ids(List<ProductMoved> productSold_ids) {
        this.productIds = productSold_ids;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getSale_date() {
        return date;
    }

    public void setSale_date(LocalDate date) {
        this.date = date;
    }

    public void addProductMoved(ProductMoved productMoved) {
        productIds.add(productMoved);
    }

    @Override
    public String toString() {
        return "Sale{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", date=" + date +
                ", amount=" + amount +
                ", inventoryId=" + inventoryId +
                ", productIds=" + productIds +
                ", status=" + status +
                '}';
    }
}
