package com.stockwise.stockwise.Controller;

import com.stockwise.stockwise.Model.Supplier;
import com.stockwise.stockwise.Repository.SupplierRepository;
import com.stockwise.stockwise.Service.SupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("supplier")
public class SupplierController {
    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierRepository) {
        this.supplierService = supplierRepository;
    }

    @GetMapping
    public ResponseEntity<List<Supplier>> getSuppliers() {
        return ResponseEntity.ok(supplierService.findAll());
    }

    @PostMapping
    public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(supplierService.addSupplier(supplier));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Supplier> updateSupplier(@RequestBody Supplier supplier, @PathVariable int id) {
        return ResponseEntity.ok(supplierService.updateSupplier(supplier, id));
    }
}
