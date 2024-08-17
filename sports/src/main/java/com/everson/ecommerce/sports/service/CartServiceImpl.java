package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.entities.CartItem;
import com.everson.ecommerce.sports.entities.ShoppingCart;
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
        log.info("Fetching All ShoppingCart");
        List<ShoppingCart> cartList = (List<ShoppingCart>) cartRepository.findAll();
        //Now we will uise stream operator to map with response
        List<CartResponse> cartResponses = cartList.stream()
                .map(this::converttoCartResponse)
                .collect(Collectors.toList());
        return cartResponses;
    }


    @Override
    public CartResponse getCartById(String cartId) {
        log.info("Fetching Cart by Id: {}", cartId);
        Optional<ShoppingCart> cartOptional = cartRepository.findById(cartId);
        if(cartOptional.isPresent()){
            ShoppingCart shoppingCart = cartOptional.get();
            log.info("Fetched Cart br Id: {}", cartId);
            return converttoCartResponse(shoppingCart);
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
    public CartResponse createCart(ShoppingCart shoppingCart) {
        log.info("Deleting Cart!");
        ShoppingCart savedCart = cartRepository.save(shoppingCart);
        log.info("Cart created with Id: {}", savedCart.getId());
        return converttoCartResponse(savedCart);
    }

    private CartResponse converttoCartResponse(ShoppingCart shoppingCart) {
        if(shoppingCart == null){
            return null;
        }
        List<CartItemResponse> itemResponses = shoppingCart.getItems().stream()
                .map(this::convertTocartItemResponses)
                .collect(Collectors.toList());
        return CartResponse.builder()
                .id(shoppingCart.getId())
                .items(itemResponses)
                .build();
    }

    private CartItemResponse convertTocartItemResponses(CartItem cartItem) {
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
