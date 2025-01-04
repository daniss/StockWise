package com.stockwise.stockwise.Repository;

import com.stockwise.stockwise.Model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
}
