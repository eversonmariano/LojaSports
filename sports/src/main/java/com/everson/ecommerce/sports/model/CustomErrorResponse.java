package com.everson.ecommerce.sports.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomErrorResponse {
    private HttpStatus status;
    private String error;
    private String message;
}
