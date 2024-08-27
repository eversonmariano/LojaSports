package com.everson.ecommerce.sports.repository;

import com.everson.ecommerce.sports.entities.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, String> {
}
