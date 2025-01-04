package com.stockwise.stockwise.Repository;

import com.stockwise.stockwise.Model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
}
