package com.stockwise.stockwise.Repository;

import com.stockwise.stockwise.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
