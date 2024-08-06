package com.everson.ecommerce.sports.model;

import com.everson.ecommerce.sports.entities.Brand;
import com.everson.ecommerce.sports.entities.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private String description;
    private Long price;
    private String pictureUrl;
    private Brand brand;
    private Type type;
}
