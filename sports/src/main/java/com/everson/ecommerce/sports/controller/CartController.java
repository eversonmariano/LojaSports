package com.everson.ecommerce.sports.controller;

import com.everson.ecommerce.sports.entities.CartItem;
import com.everson.ecommerce.sports.entities.ShoppingCart;
import com.everson.ecommerce.sports.model.CartItemResponse;
import com.everson.ecommerce.sports.model.CartResponse;
import com.everson.ecommerce.sports.service.CartService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shoppingcart")
public class CartController {

    private final CartService cartService;


    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartResponse> getAllCart() {
        return cartService.getAllCarts();
    }

    @GetMapping("/{cartId}")
    public CartResponse getCartById(@PathVariable String cartId) {
        return cartService.getCartById(cartId);
    }

    @DeleteMapping("{/cartId}")
    public void deleteCartById(@PathVariable String cartId){
        cartService.deleteCartById(cartId);
    }

    @PostMapping
    public ResponseEntity<CartResponse> createCart(@RequestBody CartResponse cartResponse){
        //convert this cart response to cart entity
        ShoppingCart shoppingCart = convertToCartEntity(cartResponse);
        //Call the service method to create the cart
        CartResponse createdCart = cartService.createCart(shoppingCart);
        //Return the Created Cart
        return new ResponseEntity<>(createdCart, HttpStatus.CREATED);
    }

    private ShoppingCart convertToCartEntity(CartResponse cartResponse) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setId(cartResponse.getId());
        shoppingCart.setItems(mapCartItemResponsesToEntities(cartResponse.getItems()));
        return shoppingCart;
    }

    private List<CartItem> mapCartItemResponsesToEntities(List<CartItemResponse> itemsResponses) {
        return itemsResponses.stream()
                .map(this::convertToCartItemEntity)
                .collect(Collectors.toList());

    }

    private CartItem convertToCartItemEntity(CartItemResponse itemResponse) {
        CartItem cartItem = new CartItem();
        cartItem.setId(itemResponse.getId());
        cartItem.setName(itemResponse.getName());
        cartItem.setDescription(itemResponse.getDescription());
        cartItem.setPrice(itemResponse.getPrice());
        cartItem.setPictureUrl(itemResponse.getPictureUrl());
        cartItem.setProductBrand(itemResponse.getProductBrand());
        cartItem.setProductType(itemResponse.getProductType());
        cartItem.setQuantity(itemResponse.getQuantity());
        return cartItem;
    }


}
