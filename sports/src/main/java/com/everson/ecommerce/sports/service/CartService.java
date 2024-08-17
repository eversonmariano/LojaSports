package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.entities.ShoppingCart;
import com.everson.ecommerce.sports.model.CartResponse;

import java.util.List;

public interface CartService {

    List<CartResponse> getAllCarts();

    CartResponse getCartById(String cartId);

    void deleteCartById(String cartId);

    CartResponse createCart(ShoppingCart shoppingCart);
}
