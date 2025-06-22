package com.handcraft.crafts.service;

import com.handcraft.crafts.entity.Product;
import com.handcraft.crafts.entity.Shop;
import com.handcraft.crafts.enums.Status;
import com.handcraft.crafts.repository.ProductRepository;
import com.handcraft.crafts.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShopRepository shopRepository;

    /**
     * Add product if the shop is APPROVED
     */
    public Product addProduct(int shopId, Product product) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found with ID: " + shopId));

        if (shop.getStatus() != Status.APPROVED) {
            throw new RuntimeException("Cannot add product. Shop is not approved.");
        }

        product.setShop(shop); // Set shop reference in product
        return productRepository.save(product);
    }

    /**
     * Get all products of a shop
     */
    public List<Product> getProductsByShop(int shopId) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found with ID: " + shopId));

        return productRepository.findByShop(shop);
    }
}
