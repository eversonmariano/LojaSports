package com.everson.ecommerce.sports;

import com.everson.ecommerce.sports.controller.ProductController;
import com.everson.ecommerce.sports.model.BrandResponse;
import com.everson.ecommerce.sports.model.ProductResponse;
import com.everson.ecommerce.sports.model.TypeResponse;
import com.everson.ecommerce.sports.service.BrandService;
import com.everson.ecommerce.sports.service.ProductService;
import com.everson.ecommerce.sports.service.TypeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductControllerTest {

    @Mock
    private ProductService productService;

    @Mock
    private BrandService brandService;

    @Mock
    private TypeService typeService;

    @InjectMocks
    private ProductController productController;

    @Test
    public void testGetProductById() {
        // Arrange
        Integer productId = 1;
        ProductResponse productResponse = new ProductResponse();
        when(productService.getProductById(productId)).thenReturn(productResponse);

        // Act
        ResponseEntity<ProductResponse> response = productController.getProductById(productId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(productResponse, response.getBody());
    }

    @Test
    public void testGetProducts() {
        // Arrange
        int page = 0;
        int size = 10;
        String keyword = "keyword";
        Integer brandId = 1;
        Integer typeId = 1;
        String sort = "name";
        String order = "asc";
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, sort));
        Page<ProductResponse> productResponses = new Page<ProductResponse>() {
            @Override
            public int getTotalPages() {
                return 1;
            }

            @Override
            public long getTotalElements() {
                return 1;
            }

            @Override
            public <U> Page<U> map(Function<? super ProductResponse, ? extends U> converter) {
                return null;
            }

            @Override
            public Pageable getPageable() {
                return pageable;
            }

            @Override
            public int getNumber() {
                return 0;
            }

            @Override
            public int getSize() {
                return 0;
            }

            @Override
            public int getNumberOfElements() {
                return 1;
            }

            @Override
            public List<ProductResponse> getContent() {
                List<ProductResponse> content = new ArrayList<>();
                content.add(new ProductResponse());
                return content;
            }

            @Override
            public boolean hasContent() {
                return true;
            }

            @Override
            public Sort getSort() {
                return Sort.by(Sort.Direction.ASC, sort);
            }

            @Override
            public boolean isFirst() {
                return true;
            }

            @Override
            public boolean isLast() {
                return true;
            }

            @Override
            public boolean hasNext() {
                return false;
            }

            @Override
            public boolean hasPrevious() {
                return false;
            }

            @Override
            public Pageable nextPageable() {
                return null;
            }

            @Override
            public Pageable previousPageable() {
                return null;
            }

            @Override
            public Iterator<ProductResponse> iterator() {
                return null;
            }
        };
        when(productService.getProducts(any(Pageable.class), any(Integer.class), any(Integer.class), any(String.class))).thenReturn(productResponses);

        // Act
        ResponseEntity<Page<ProductResponse>> response = productController.getProducts(page, size, keyword, brandId, typeId, sort, order);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(productResponses, response.getBody());
    }

    @Test
    public void testGetBrands() {
        // Arrange
        List<BrandResponse> brandResponses = new ArrayList<>();
        brandResponses.add(new BrandResponse());
        when(brandService.getAllBrands()).thenReturn(brandResponses);

        // Act
        ResponseEntity<List<BrandResponse>> response = productController.getBrands();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(brandResponses, response.getBody());
    }

    @Test
    public void testGetTypes() {
        // Arrange
        List<TypeResponse> typeResponses = new ArrayList<>();
        typeResponses.add(new TypeResponse());
        when(typeService.getAllTypes()).thenReturn(typeResponses);

        // Act
        ResponseEntity<List<TypeResponse>> response = productController.getTypes();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(typeResponses, response.getBody());
    }
}