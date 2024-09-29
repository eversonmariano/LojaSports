package com.everson.ecommerce.sports;

import com.everson.ecommerce.sports.controller.AuthController;
import com.everson.ecommerce.sports.model.JwtRequest;
import com.everson.ecommerce.sports.model.JwtResponse;
import com.everson.ecommerce.sports.security.JwtHelper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private AuthenticationManager manager;

    @Mock
    private JwtHelper jwtHelper;

    @InjectMocks
    private AuthController authController;

    @Test
    public void testLogin() {
        // Arrange
        JwtRequest request = new JwtRequest("username", "password");
        UserDetails userDetails = new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return null;
            }

            @Override
            public String getPassword() {
                return null;
            }

            @Override
            public String getUsername() {
                return "username";
            }

            @Override
            public boolean isAccountNonExpired() {
                return false;
            }

            @Override
            public boolean isAccountNonLocked() {
                return false;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return false;
            }

            @Override
            public boolean isEnabled() {
                return false;
            }
        };
        String token = "token";
        when(userDetailsService.loadUserByUsername(any(String.class))).thenReturn(userDetails);
        when(jwtHelper.generateToken(any(UserDetails.class))).thenReturn(token);

        // Act
        ResponseEntity<JwtResponse> response = authController.login(request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("username", response.getBody().getUsername());
        assertEquals(token, response.getBody().getToken());
    }

    @Test
    public void testGetUserDetails() {
        // Arrange
        String tokenHeader = "Bearer token";
        String token = "token";
        UserDetails userDetails = new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return null;
            }

            @Override
            public String getPassword() {
                return null;
            }

            @Override
            public String getUsername() {
                return "username";
            }

            @Override
            public boolean isAccountNonExpired() {
                return false;
            }

            @Override
            public boolean isAccountNonLocked() {
                return false;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return false;
            }

            @Override
            public boolean isEnabled() {
                return false;
            }
        };
        when(jwtHelper.getUsernameFromToken(any(String.class))).thenReturn("username");
        when(userDetailsService.loadUserByUsername(any(String.class))).thenReturn(userDetails);

        // Act
        ResponseEntity<UserDetails> response = authController.getUserDetails(tokenHeader);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDetails, response.getBody());
    }

    @Test
    public void testGetUserDetailsInvalidToken() {
        // Arrange
        String tokenHeader = "Invalid token";

        // Act
        ResponseEntity<UserDetails> response = authController.getUserDetails(tokenHeader);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}