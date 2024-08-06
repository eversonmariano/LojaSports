package com.everson.ecommerce.sports.repository;

import com.everson.ecommerce.sports.entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {

}
