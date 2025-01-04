package com.stockwise.stockwise.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date order_date;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ProductMoved> productIds = new ArrayList<>();
    private Status status;
    @ManyToOne
    @JoinColumn(name = "supplier")
    private Supplier supplierId;
    @ManyToOne
    @JoinColumn(name = "inventory")
    private Inventory inventoryId;
    private Date estimated_delivery_date;
    private Double total_cost;

    public Order(Integer id,
                 Date order_date,
                 List<ProductMoved> productIds,
                 Status status,
                 Supplier supplierId,
                 Inventory inventoryId,
                 Date estimated_delivery_date,
                 Double total_cost) {
        this.id = id;
        this.order_date = order_date;
        this.productIds = productIds;
        this.status = status;
        this.supplierId = supplierId;
        this.inventoryId = inventoryId;
        this.estimated_delivery_date = estimated_delivery_date;
        this.total_cost = total_cost;
    }

    public Order() {
    }

    public List<ProductMoved> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<ProductMoved> productIds) {
        this.productIds = productIds;
    }

    public Inventory getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(Inventory inventoryId) {
        this.inventoryId = inventoryId;
    }

    public void addProductMoved(ProductMoved productMoved) {
        productIds.add(productMoved);
    }

    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        order_date = new Date();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getOrder_date() {
        return order_date;
    }

    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }

    public List<ProductMoved> getProduct_ids() {
        return productIds;
    }

    public void setProduct_ids(List<ProductMoved> productIds) {
        this.productIds = productIds;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Inventory getInventory_id() {
        return inventoryId;
    }

    public void setInventory_id(Inventory inventoryId) {
        this.inventoryId = inventoryId;
    }

    public Date getEstimated_delivery_date() {
        return estimated_delivery_date;
    }

    public void setEstimated_delivery_date(Date estimated_delivery_date) {
        this.estimated_delivery_date = estimated_delivery_date;
    }

    public Double getTotal_cost() {
        return total_cost;
    }

    public void setTotal_cost(Double total_cost) {
        this.total_cost = total_cost;
    }

    public Supplier getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Supplier supplierId) {
        this.supplierId = supplierId;
    }
}
