package com.everson.ecommerce.sports;

import com.everson.ecommerce.sports.controller.CartController;
import com.everson.ecommerce.sports.entities.Cart;
import com.everson.ecommerce.sports.model.CartResponse;
import com.everson.ecommerce.sports.service.CartService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CartControllerTest {

    @Mock
    private CartService cartService;

    @InjectMocks
    private CartController cartController;

    @Test
    public void testGetAllCarts() {
        // Arrange
        List<CartResponse> cartResponses = new ArrayList<>();
        cartResponses.add(new CartResponse());
        when(cartService.getAllCarts()).thenReturn(cartResponses);

        // Act
        List<CartResponse> response = cartController.getAllCarts();

        // Assert
        assertEquals(cartResponses, response);
    }

    @Test
    public void testGetCartById() {
        // Arrange
        String cartId = "cartId";
        CartResponse cartResponse = new CartResponse();
        when(cartService.getCartById(cartId)).thenReturn(cartResponse);

        // Act
        CartResponse response = cartController.getCartById(cartId);

        // Assert
        assertEquals(cartResponse, response);
    }

    @Test
    public void testDeleteCartById() {
        // Arrange
        String cartId = "cartId";

        // Act
        cartController.deleteCartById(cartId);

        // Assert
        // No assertion needed, as the method is void
    }

    @Test
    public void testCreateCart() {
        // Arrange
        CartResponse cartResponse = new CartResponse();
        Cart cart = new Cart();
        when(cartService.createCart(any(Cart.class))).thenReturn(cartResponse);

        // Act
        ResponseEntity<CartResponse> response = cartController.createCart(cartResponse);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(cartResponse, response.getBody());
    }
}