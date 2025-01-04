package com.stockwise.stockwise.Repository;

import com.stockwise.stockwise.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
