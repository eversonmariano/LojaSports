package com.everson.ecommerce.sports;

import com.everson.ecommerce.sports.controller.OrdersController;
import com.everson.ecommerce.sports.model.OrderDto;
import com.everson.ecommerce.sports.model.OrderResponse;
import com.everson.ecommerce.sports.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

public class OrdersControllerTest {

    @Mock
    private OrderService orderService;

    @InjectMocks
    private OrdersController ordersController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetOrderById() {
        OrderResponse order = new OrderResponse();
        order.setId(1);
        when(orderService.getOrderById(1)).thenReturn(order);
        ResponseEntity<OrderResponse> response = ordersController.getOrderById(1);
        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody().getId() == 1;
    }

    @Test
    public void testGetOrderByIdNotFound() {
        when(orderService.getOrderById(1)).thenReturn(null);
        ResponseEntity<OrderResponse> response = ordersController.getOrderById(1);
        assert response.getStatusCode() == HttpStatus.NOT_FOUND;
    }

    @Test
    public void testGetAllOrders() {
        List<OrderResponse> orders = new ArrayList<>();
        orders.add(new OrderResponse());
        orders.add(new OrderResponse());
        when(orderService.getAllOrders()).thenReturn(orders);
        ResponseEntity<List<OrderResponse>> response = ordersController.getAllOrders();
        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody().size() == 2;
    }


}