package com.everson.ecommerce.sports.repository;

import com.everson.ecommerce.sports.entities.ShoppingCart;
import org.springframework.data.repository.CrudRepository;

public interface CartRepository extends CrudRepository<ShoppingCart, String> {
}
