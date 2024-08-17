package com.everson.ecommerce.sports.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("ShoppingCart")
public class ShoppingCart {
    @Id
    private String id;
    private List<CartItem> items = new ArrayList<>();

    public ShoppingCart(String id){
        this.id = id;
    }
}
