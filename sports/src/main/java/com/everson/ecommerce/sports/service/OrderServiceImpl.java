package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.entities.OrderAggregate.Order;
import com.everson.ecommerce.sports.entities.OrderAggregate.OrderItem;
import com.everson.ecommerce.sports.entities.OrderAggregate.ProductItemOrdered;
import com.everson.ecommerce.sports.mapper.OrderMapper;
import com.everson.ecommerce.sports.model.CartItemResponse;
import com.everson.ecommerce.sports.model.CartResponse;
import com.everson.ecommerce.sports.model.OrderDto;
import com.everson.ecommerce.sports.model.OrderResponse;
import com.everson.ecommerce.sports.repository.BrandRepository;
import com.everson.ecommerce.sports.repository.OrderRepository;
import com.everson.ecommerce.sports.repository.TypeRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final BrandRepository brandRepository;
    private final TypeRepository typeRepository;
    private final CartService cartService;
    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderRepository orderRepository, BrandRepository brandRepository, TypeRepository typeRepository, CartService cartService, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.brandRepository = brandRepository;
        this.typeRepository = typeRepository;
        this.cartService = cartService;
        this.orderMapper = orderMapper;
    }

    @Override
    public OrderResponse getOrderById(Integer orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        return optionalOrder.map(orderMapper::OrderToOrderResponse).orElse(null);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(orderMapper::OrderToOrderResponse).collect(Collectors.toList());
    }

    @Override
    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable).map(orderMapper::OrderToOrderResponse);
    }


    @Override
    public void deleteOrder(Integer orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public Integer createOrder(OrderDto orderDto) {
        //Fetching Cart details
        CartResponse cartResponse = cartService.getCartById(orderDto.getCartId());
        if(cartResponse == null){
            log.error("Basket with ID {} not found", orderDto.getCartId());
            return null;
        }
        //Map basket items to order items
        List<OrderItem> orderItems = cartResponse.getItems().stream()
                .map(this::mapCartItemToOrderItem)
                .collect(Collectors.toList());

        //calculate subtotal
        double subTotal = cartResponse.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        //set order details
        Order order = orderMapper.orderResponseToOrder(orderDto);
        order.setOrderItems(orderItems);
        order.setSubTotal(subTotal);

        //save the order
        Order savedOrder = orderRepository.save(order);
        cartService.deleteCartById(orderDto.getCartId());
        //return the response
        return savedOrder.getId();
    }

    private OrderItem mapCartItemToOrderItem(CartItemResponse cartItemResponse) {
        if(cartItemResponse!=null){
            OrderItem orderItem = new OrderItem();
            orderItem.setItemOrdered(mapCartItemToProduct(cartItemResponse));
            orderItem.setQuantity(cartItemResponse.getQuantity());
            return orderItem;
        }else{
            return null;
        }
    }

    private ProductItemOrdered mapCartItemToProduct(CartItemResponse cartItemResponse) {
        ProductItemOrdered productItemOrdered = new ProductItemOrdered();
        //Populate
        productItemOrdered.setName(cartItemResponse.getName());
        productItemOrdered.setPictureUrl(cartItemResponse.getPictureUrl());
        productItemOrdered.setProductId(cartItemResponse.getId());
        return productItemOrdered;
    }
}
