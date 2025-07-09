package com.govimansala.product_service.service;

import com.govimansala.product_service.model.Product;
import com.govimansala.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService{
    private final ProductRepository productRepository;

    public Product addProdct(Product product){

        return productRepository.save(product);

    }
    public List<Product> getAllProducts(){

        return productRepository.findAll();
    }

    public Optional<Product> getProductById(int id){
        return productRepository.findById(id);
    }
    public List<Product> getProductsByVendor(int userId){
        return productRepository.findByUserId(userId);
    }
    public void deleteProduct(int id){
        productRepository.deleteByt
    }


}