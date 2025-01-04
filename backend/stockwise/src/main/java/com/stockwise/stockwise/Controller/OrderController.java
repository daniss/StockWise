package com.stockwise.stockwise.Controller;

import com.stockwise.stockwise.DTO.OrderRequest;
import com.stockwise.stockwise.Model.Order;
import com.stockwise.stockwise.Service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> addOrder(@RequestBody OrderRequest orderRequest) {
        Order newOrder = orderService.addOrder(orderRequest);
        if (newOrder != null) {
            return ResponseEntity.ok(newOrder);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping
    public ResponseEntity<Order> updateOrder(@RequestBody Order orderUpdated) {
        return ResponseEntity.ok(orderService.updateOrder(orderUpdated));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Integer id) {
        Order order = orderService.findById(id);

        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        System.out.println("test : " + order.getProductIds());
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Order> deleteOrder(@PathVariable("id") Integer id) {
        Order order = orderService.deleteOrder(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }
}
