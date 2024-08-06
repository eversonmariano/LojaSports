package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.entities.Brand;
import com.everson.ecommerce.sports.model.BrandResponse;
import com.everson.ecommerce.sports.repository.BrandRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.connector.Response;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<BrandResponse> getAllBrands() {
        log.info("Fetching All Brands");
        //Fetch brands
        List<Brand> brandList = brandRepository.findAll();
        //Now use stream operator to map with Response
        List<BrandResponse> brandResponses = brandList.stream()
                .map(this::convertToBrandResponse)
                .collect(Collectors.toList());
        log.info("Fetched All Brands!");
        return brandResponses;
    }

    private BrandResponse convertToBrandResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();

    }

}
