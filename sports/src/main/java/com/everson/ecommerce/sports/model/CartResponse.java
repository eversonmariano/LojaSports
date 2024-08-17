package com.everson.ecommerce.sports.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {
    private String id;
    private List<CartItemResponse> items;

}
