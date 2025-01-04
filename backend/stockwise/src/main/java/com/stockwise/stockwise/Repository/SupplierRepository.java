package com.stockwise.stockwise.Repository;

import com.stockwise.stockwise.Model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}
