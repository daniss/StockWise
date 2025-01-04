package com.stockwise.stockwise.Service;

import com.stockwise.stockwise.Model.Supplier;
import com.stockwise.stockwise.Repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> findAll() {
        return supplierRepository.findAll();
    }

    public Supplier addSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(Supplier supplier, Integer id) {
        Optional<Supplier> supplierOptional = supplierRepository.findById(id);
        if (supplierOptional.isPresent()) {
            Supplier supplierToUpdate = supplierOptional.get();
            supplierToUpdate.setName(supplier.getName());
            supplierToUpdate.setEmail(supplier.getEmail());
            supplierToUpdate.setPhone(supplier.getPhone());
            supplierToUpdate.setAddress(supplier.getAddress());
            supplierToUpdate.setRating(supplier.getRating());
            return supplierRepository.save(supplierToUpdate);
        }
        return null;
    }
}
