package com.stockwise.stockwise.Service;

import com.stockwise.stockwise.DTO.InventoryRequest;
import com.stockwise.stockwise.Model.Inventory;
import com.stockwise.stockwise.Model.Organization;
import com.stockwise.stockwise.Model.Product;
import com.stockwise.stockwise.Model.Supplier;
import com.stockwise.stockwise.Repository.InventoryRepository;
import com.stockwise.stockwise.Repository.OrganizationRepository;
import com.stockwise.stockwise.Repository.ProductRepository;
import com.stockwise.stockwise.Repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final OrganizationRepository organizationRepository;

    public InventoryService(InventoryRepository inventoryRepository,
                            ProductRepository productRepository,
                            SupplierRepository supplierRepository, OrganizationRepository organizationRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
        this.organizationRepository = organizationRepository;
    }

    public Inventory addInventoryProduct(InventoryRequest newProduct) {
        Product product = productRepository.findById(newProduct.getProduct_id()).orElse(null);
        if (product == null) {
            return null;
        }

        Organization organization = organizationRepository.findById(newProduct.getOrganization_id()).orElse(null);
//        if (organization == null) {
//            return null;
//        }
        Supplier supplier = supplierRepository.findById(newProduct.getSupplier_id()).orElse(null);

        Inventory inventory = new Inventory();
        inventory.setProduct_id(product);
        inventory.setSupplier_id(supplier);
        inventory.setQuantity(newProduct.getQuantity());
        inventory.setThreshold(newProduct.getThreshold());
        inventoryRepository.save(inventory);
        return inventory;
    }

    public void removeInventoryProduct(Integer id) {
        inventoryRepository.deleteById(id);
    }

    public Inventory updateInventoryProduct(Inventory product) {
        inventoryRepository.save(product);
        return inventoryRepository.getReferenceById(product.getId());
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
}
