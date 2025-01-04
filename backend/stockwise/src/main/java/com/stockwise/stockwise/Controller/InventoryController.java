package com.stockwise.stockwise.Controller;

import com.stockwise.stockwise.DTO.InventoryRequest;
import com.stockwise.stockwise.Model.Inventory;
import com.stockwise.stockwise.Service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("inventory")
public class InventoryController {
    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping("/product")
    public ResponseEntity<Inventory> addInventoryProduct(@RequestBody InventoryRequest inventoryRequest) {
        Inventory addedProduct = inventoryService.addInventoryProduct(inventoryRequest);
        if (addedProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(addedProduct);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Inventory> removeInventoryProduct(@PathVariable Integer id) {
        inventoryService.removeInventoryProduct(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Inventory> updateInventoryProduct(@PathVariable Integer id, @RequestBody Inventory product) {
        product.setId(id);
        Inventory updatedProduct = inventoryService.updateInventoryProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventoryProducts() {
        List<Inventory> productInventory = inventoryService.getAllInventory();
        if (productInventory.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(productInventory);
    }
}
