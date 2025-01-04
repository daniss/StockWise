package com.stockwise.stockwise.Controller;

import com.stockwise.stockwise.DTO.SaleDataRequest;
import com.stockwise.stockwise.Model.Sale;
import com.stockwise.stockwise.Repository.SaleRepository;
import com.stockwise.stockwise.Service.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sale")
public class SaleController {
    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public ResponseEntity<Sale> addSale(@RequestBody Sale sale){
        Sale saleAdded = saleService.addSale(sale);
        if (saleAdded == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(saleAdded);
    }

    @GetMapping
    public ResponseEntity<List<Sale>> getAllSale(){
        return ResponseEntity.ok(saleService.getAllSales());
    }

    @GetMapping("/data")
    public ResponseEntity<SaleDataRequest> getSalesData(){
        return ResponseEntity.ok(saleService.getSalesData());
    }
}
