package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.entities.Product;
import com.everson.ecommerce.sports.model.ProductResponse;
import com.everson.ecommerce.sports.repository.ProductRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
    public Page<ProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword) {
        log.info("Fetchinf Products!");
        //Fetching from DB
        Specification<Product> spec = Specification.where(null);
        if(brandId != null){
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("brand").get("id"), brandId));
        }
        if(typeId != null){
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("type").get("id"), typeId));
        }
        if(keyword != null && !keyword.isEmpty()){
            spec.and(((root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + keyword + "%")));
        }
        log.info("Fetched All Products!");
        //Map
        return productRepository.findAll(spec, pageable).map(this::convertToProductResponse);
                
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
