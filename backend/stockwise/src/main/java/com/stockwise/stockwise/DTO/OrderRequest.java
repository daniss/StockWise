package com.stockwise.stockwise.DTO;

import com.stockwise.stockwise.Model.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderRequest {
    private List<ProductMoved> productIds;
    private Integer supplierId;
    private Integer inventoryId;
    private Integer oldId;

    public Integer getOldId() {
        return oldId;
    }

    public void setOldId(Integer oldId) {
        this.oldId = oldId;
    }

    public Integer getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(Integer inventoryId) {
        this.inventoryId = inventoryId;
    }

    public List<ProductMoved> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<ProductMoved> productIds) {
        this.productIds = productIds;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }
}
