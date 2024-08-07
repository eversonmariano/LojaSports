package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.model.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProductService {

    ProductResponse getProductById(Integer productId);

    Page<ProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword);
}
