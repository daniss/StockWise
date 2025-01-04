package com.stockwise.stockwise.Service;

import com.stockwise.stockwise.DTO.SaleDataRequest;
import com.stockwise.stockwise.Model.*;
import com.stockwise.stockwise.Repository.InventoryRepository;
import com.stockwise.stockwise.Repository.ProductMovedRepository;
import com.stockwise.stockwise.Repository.ProductRepository;
import com.stockwise.stockwise.Repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SaleService {
    private final SaleRepository saleRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductMovedRepository productMovedRepository;
    private final ProductRepository productRepository;

    public SaleService(SaleRepository saleRepository,
                       InventoryRepository inventoryRepository,
                       ProductMovedRepository productMovedRepository,
                       ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.inventoryRepository = inventoryRepository;
        this.productMovedRepository = productMovedRepository;
        this.productRepository = productRepository;
    }

    public Sale addSale(Sale sale) {
        Sale newSale = new Sale();

        double total_price = 0;
        for (ProductMoved productId : sale.getProductSold_ids()) {
            Product productOrdered = productRepository.findById(productId.getProductId().getId()).orElse(null);
            if (productOrdered == null) {
                return null;
            }

            ProductMoved productMoved = new ProductMoved();
            productMoved.setProductId(productOrdered);
            productMoved.setQuantity(productId.getQuantity());
            productMoved.setPrice(productId.getPrice());

            total_price += productMoved.getQuantity() * productMoved.getPrice();
            newSale.addProductMoved(productMoved);
            Optional<Inventory> inventoryProduct = inventoryRepository.findById(productId.getProductId().getId());
            if (inventoryProduct.isPresent()) {
                Inventory inventory = inventoryProduct.get();
                int total_quantity = inventory.getQuantity() - productMoved.getQuantity();
                if (total_quantity < 0) {
                    return null;
                }
                inventory.setQuantity(total_quantity);
                inventoryRepository.save(inventory);
            }
            else {
                return null;
            }
        }

        newSale.setInventory_id(null);
        newSale.setAmount(total_price);
        newSale.setSale_date(LocalDate.now());
        newSale.setCustomerName(sale.getCustomerName());
        newSale.setStatus(Status.pending);
        saleRepository.save(newSale);
        for (ProductMoved productId : sale.getProductSold_ids()) {
            productId.setSale(newSale);
            productMovedRepository.save(productId);
        }
        return newSale;
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

//    private Double totalSales;
//    private Integer orderCount;
//    private Integer revenueGrowth;
//    private String bestSeller;
//    private List<Sale> recentOrders;
//    private List<MonthlyTrends> monthlyTrends;

    public SaleDataRequest getSalesData() {

        SaleDataRequest saleDataRequest = new SaleDataRequest();
        List<Sale> allSales = saleRepository.findAll();
        saleDataRequest.setTotalSales(allSales.stream().mapToDouble(Sale::getAmount).sum());
        saleDataRequest.setOrderCount(allSales.size());

        saleDataRequest.setRevenueGrowth(getPercentageGrowth(allSales));

        String bestSellingProduct = getBestSellingProduct(allSales);
        saleDataRequest.setBestSeller(bestSellingProduct);

        saleDataRequest.setRecentOrders(allSales.stream()
                .filter(sale -> !sale.getSale_date().isBefore(LocalDate.now().withDayOfMonth(1)) && !sale.getSale_date().isAfter(LocalDate.now()))
                .collect(Collectors.toList()));

        Map<String, Integer> salesMonth = new HashMap<>();
        for (Sale sale : allSales.stream()
                .filter(sale -> sale.getSale_date().isAfter(LocalDate.now().minusYears(1)) &&
                        sale.getSale_date().isBefore(LocalDate.now()))
                .toList()) {
            salesMonth.put(sale.getSale_date().getMonth().toString(), sale.getSale_date().getDayOfMonth());
        }
        for (Map.Entry<String, Integer> entry : salesMonth.entrySet()) {
            if (entry.getValue() == 0){
                salesMonth.remove(entry.getKey());
            }
        }
//        or (Sale sale : allSales) {
//            for (ProductMoved productMoved : sale.getProductSold_ids()) {
//                String productName = productMoved.getProduct_id().getName(); // Get the product name
//                // Update the total sales for the product
//                salesByProduct.put(productName, salesByProduct.getOrDefault(productName, 0.0) + productMoved.getQuantity());
//            }
//        }

        return saleDataRequest;
    }

    private static Double getPercentageGrowth(List<Sale> allSales) {

        LocalDate today = LocalDate.now();
        int currentDayOfMonth = today.getDayOfMonth();
        LocalDate currentMonthStart = today.withDayOfMonth(1);
        LocalDate previousMonthStart = currentMonthStart.minusMonths(1);
        LocalDate previousMonthEnd = previousMonthStart.plusDays(currentDayOfMonth - 1);

        double currentMonthSales = allSales.stream()
                .filter(sale -> !sale.getSale_date().isBefore(currentMonthStart) && !sale.getSale_date().isAfter(today))
                .mapToDouble(Sale::getAmount)
                .sum();

        double previousMonthSales = allSales.stream()
                .filter(sale -> !sale.getSale_date().isBefore(previousMonthStart) && !sale.getSale_date().isAfter(previousMonthEnd))
                .mapToDouble(Sale::getAmount)
                .sum();

        return previousMonthSales == 0
                ? 0
                : ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
    }

    private static String getBestSellingProduct(List<Sale> allSales) {
        Map<String, Double> salesByProduct = new HashMap<>();

        // Loop through all sales
        for (Sale sale : allSales) {
            for (ProductMoved productMoved : sale.getProductIds()){
                String productName = productMoved.getProductId().getName(); // Get the product name
                salesByProduct.put(productName, salesByProduct.getOrDefault(productName, 0.0) + productMoved.getQuantity());
            }
        }
        String bestSellingProduct = null;
        double maxSales = 0.0;

        for (Map.Entry<String, Double> entry : salesByProduct.entrySet()) {
            if (entry.getValue() > maxSales) {
                maxSales = entry.getValue();
                bestSellingProduct = entry.getKey();
            }
        }
        return bestSellingProduct;
    }
}
