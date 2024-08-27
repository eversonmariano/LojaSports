package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.entities.Cart;
import com.everson.ecommerce.sports.model.CartResponse;

import java.util.List;

public interface CartService {

    List<CartResponse> getAllCarts();

    CartResponse getCartById(String cartId);

    void deleteCartById(String cartId);

    CartResponse createCart(Cart cart);
}
