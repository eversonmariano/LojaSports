package com.everson.ecommerce.sports.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@RedisHash("CarItem")
public class CartItem {
    @Id
    private Integer id;
    private String name;
    private String description;
    private Long price;
    private String pictureUrl;
    private String productBrand;
    private String productType;
    private Integer quantity;


}
