package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.entities.Product;
import com.everson.ecommerce.sports.model.ProductResponse;
import com.everson.ecommerce.sports.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService {

    final private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductResponse getProductById(Integer productId) {
        log.info("Fetching Product by id: {}", productId);
        Product product = productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product doesn't exist"));
        //Now convert the Product to Product Response
        ProductResponse productResponse = convertToProductResponse(product);
        log.info("Fetched Product by Product Id: {}", productId);
        return productResponse;
    }

    @Override
    public List<ProductResponse> getProducts() {
        log.info("Fetchinf Products!");
        //Fetching from DB
        List<Product> productList = productRepository.findAll();
        //Map
        List<ProductResponse> productResponses = productList.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched All Products!");
        return productResponses;
    }

    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .pictureUrl(product.getPictureUrl())
                .productBrand(product.getBrand().getName())
                .productType(product.getType().getName())
                .build();
    }


}
