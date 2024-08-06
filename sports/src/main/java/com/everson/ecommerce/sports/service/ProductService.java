package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.model.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse getProductById(Integer productId);
    List<ProductResponse> getProducts();
}
