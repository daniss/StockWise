package com.stockwise.stockwise.Repository;

import com.stockwise.stockwise.Model.ProductMoved;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductMovedRepository extends JpaRepository<ProductMoved, Integer> {
}
