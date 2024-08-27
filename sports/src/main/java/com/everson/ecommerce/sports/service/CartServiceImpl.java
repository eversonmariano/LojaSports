package com.everson.ecommerce.sports.service;
import com.everson.ecommerce.sports.entities.Cart;
import com.everson.ecommerce.sports.entities.CartItem;
import com.everson.ecommerce.sports.model.CartItemResponse;
import com.everson.ecommerce.sports.model.CartResponse;
import com.everson.ecommerce.sports.repository.CartRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {

        this.cartRepository = cartRepository;
    }

    @Override
    public List<CartResponse> getAllCarts() {
        log.info("Fetching All Cart");
        List<Cart> cartList = (List<Cart>) cartRepository.findAll();
        //Now we will uise stream operator to map with response
        log.info("Fetched All Cart");
        return cartList.stream()
                .map(this::converttoCartResponse)
                .collect(Collectors.toList());
    }


    @Override
    public CartResponse getCartById(String cartId) {
        log.info("Fetching Cart by Id: {}", cartId);
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if(cartOptional.isPresent()){
            Cart cart = cartOptional.get();
            log.info("Fetched Cart by Id: {}", cartId);
            return converttoCartResponse(cart);
        } else {
            log.info("Cart with Id: {} not found", cartId);
            return null;
        }

    }

    @Override
    public void deleteCartById(String cartId) {
        log.info("Deleting cart by Id: {}", cartId);
        cartRepository.deleteById(cartId);
        log.info("Deleted Cart by Id: {}", cartId);

    }

    @Override
    public CartResponse createCart(Cart cart) {
        log.info("Creating Cart!");
        Cart savedCart = cartRepository.save(cart);
        log.info("Cart created with Id: {}", savedCart.getId());
        return converttoCartResponse(savedCart);
    }

    private CartResponse converttoCartResponse(Cart cart) {
        if(cart == null){
            return null;
        }
        List<CartItemResponse> itemResponses = cart.getItems().stream()
                .map(this::convertToCartItemResponses)
                .collect(Collectors.toList());
        return CartResponse.builder()
                .id(cart.getId())
                .items(itemResponses)
                .build();
    }

    private CartItemResponse convertToCartItemResponses(CartItem cartItem) {
        return CartItemResponse.builder()
                .id(cartItem.getId())
                .name(cartItem.getName())
                .description(cartItem.getDescription())
                .price(cartItem.getPrice())
                .pictureUrl(cartItem.getPictureUrl())
                .productBrand(cartItem.getProductBrand())
                .productType(cartItem.getProductType())
                .quantity(cartItem.getQuantity())
                .build();
    }

}
