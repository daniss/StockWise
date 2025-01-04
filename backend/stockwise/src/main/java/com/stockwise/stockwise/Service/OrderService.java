package com.stockwise.stockwise.Service;

import com.stockwise.stockwise.DTO.OrderRequest;
import com.stockwise.stockwise.Model.*;
import com.stockwise.stockwise.Repository.*;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductMovedRepository productMovedRepository;

    public OrderService(OrderRepository orderRepository,
                        SupplierRepository supplierRepository,
                        ProductRepository productRepository,
                        InventoryRepository inventoryRepository,
                        ProductMovedRepository productMovedRepository
                        ) {
        this.orderRepository = orderRepository;
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
        this.productMovedRepository = productMovedRepository;
    }
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//    @ManyToOne
//    @JoinColumn(name = "product")
//    private Product product_id;
//    private Integer quantity;
//    @ManyToOne
//    private Order order;
//    private Float price;
//    @ManyToOne
//    private Sale sale;

    public Order addOrder(OrderRequest order) {
        Order newOrder = new Order();

        double total_cost = 0;
        for (ProductMoved productId : order.getProductIds()) {
            Product productOrdered = productRepository.findById(productId.getProductId().getId()).orElse(null);
            if (productOrdered == null) {
                return null;
            }

            ProductMoved productMoved = new ProductMoved();
            productMoved.setProductId(productOrdered);
            productMoved.setQuantity(productId.getQuantity());
            productMoved.setPrice(productId.getPrice());

            total_cost += productMoved.getQuantity() * productMoved.getPrice();
            newOrder.addProductMoved(productMoved);
        }

        newOrder.setStatus(Status.pending);
        if (order.getSupplierId() != null) {
            Optional<Supplier> supplier = supplierRepository.findById(order.getSupplierId());
            if (supplier.isEmpty()) {
                return null;
            }
            newOrder.setSupplierId(supplier.get());
        }
        Inventory inventory = inventoryRepository.getReferenceById(order.getInventoryId());
        newOrder.setInventory_id(null);
        newOrder.setEstimated_delivery_date(new Date());
        newOrder.setTotal_cost(total_cost);
        orderRepository.save(newOrder);
        for (ProductMoved productId : newOrder.getProductIds()) {
            productId.setOrder(newOrder);
            productMovedRepository.save(productId);
        }

        return newOrder;
    }

    public Order updateOrder(Order order) {
        orderRepository.save(order);
        return order;
    }

    public Order findById(Integer id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order deleteOrder(Integer id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            return null;
        }
        orderRepository.delete(order);
        return order;
    }
}
