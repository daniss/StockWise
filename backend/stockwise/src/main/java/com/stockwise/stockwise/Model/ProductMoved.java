package com.stockwise.stockwise.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class ProductMoved {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "product")
    private Product productId;
    private Integer quantity;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "order_id")
    private Order order;
    private Float price;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "sale_id")
    private Sale sale;


    public ProductMoved() {
    }

    public ProductMoved(Integer id, Product productId, Integer quantity, Order order, Float price, Sale sale) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.order = order;
        this.price = price;
        this.sale = sale;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Product getProductId() {
        return productId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Sale getSale() {
        return sale;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
