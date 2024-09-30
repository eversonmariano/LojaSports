package com.everson.ecommerce.sports.model;

import com.everson.ecommerce.sports.entities.OrderAggregate.ShippingAddress;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private String cartId;
    private ShippingAddress shippingAddress;
    private Long subTotal;
    private Long deliveryFee;
    private LocalDateTime orderDate;
}
