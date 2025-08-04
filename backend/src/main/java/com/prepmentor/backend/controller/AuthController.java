package com.prepmentor.backend.controller;

import com.prepmentor.backend.config.JwtUtil;
import com.prepmentor.backend.dto.AuthRequest;
import com.prepmentor.backend.dto.AuthResponse;
import com.prepmentor.backend.dto.RegisterRequest;
import com.prepmentor.backend.repository.UserRepository;
import com.prepmentor.backend.common.ApiResponse;
import com.prepmentor.backend.service.CustomUserDetailsService;
import com.prepmentor.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller for handling authentication-related endpoints such as login and
 * registration.
 * <p>
 * Endpoints:
 * <ul>
 * <li>POST /api/login - Authenticate a user and return a JWT token.</li>
 * <li>POST /api/register - Register a new user.</li>
 * </ul>
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    /**
     * Authenticates a user and returns a JWT token if successful.
     *
     * @param request the authentication request containing email and password
     * @return a response entity with the authentication result and JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            String token = jwtUtil.generateToken(userDetails.getUsername());

            log.info("Login successful for email: {}", request.getEmail());
            ApiResponse<AuthResponse> response = new ApiResponse<>(
                    200,
                    "Login successful",
                    new AuthResponse(token),
                    Collections.emptyList());

            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            log.warn("Login failed for email: {}. Reason: {}", request.getEmail(), ex.getMessage());
            ApiResponse<AuthResponse> errorResponse = new ApiResponse<>(
                    401,
                    "Invalid credentials",
                    null,
                    Collections.singletonList(ex.getMessage()));
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

    /**
     * Registers a new user in the system.
     *
     * @param request the registration request containing user details
     * @return a response entity with the registration result
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Registration attempt for email: {}", request.getEmail());
        try {
            userService.registerUser(request.getName(), request.getEmail(), request.getPassword());
            log.info("Registration successful for email: {}", request.getEmail());
            ApiResponse<String> response = new ApiResponse<>(
                    200,
                    "User registered successfully",
                    null,
                    Collections.emptyList());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            log.warn("Registration failed for email: {}. Reason: {}", request.getEmail(), ex.getMessage());
            ApiResponse<String> response = new ApiResponse<>(
                    400,
                    "User already exists",
                    null,
                    Collections.singletonList(ex.getMessage()));
            return ResponseEntity.badRequest().body(response);
        }
    }

}
