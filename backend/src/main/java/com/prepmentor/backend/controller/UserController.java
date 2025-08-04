package com.prepmentor.backend.controller;

import com.prepmentor.backend.dto.UserProfileResponse;
import com.prepmentor.backend.model.User;
import com.prepmentor.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Controller for managing user-related endpoints.
 * <p>
 * Endpoints:
 * <ul>
 * <li>GET /api/users - Retrieve a list of all users.</li>
 * </ul>
 */
@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Retrieves a list of all users.
     *
     * @return a list of users
     */
    @GetMapping
    public List<User> getAllUsers() {
        log.info("Fetching all users");
        return userService.getAllUsers();
    }

    /**
     * Returns the profile of the currently authenticated user.
     *
     * @return UserProfileResponse containing id, name, and email
     */
    @GetMapping("/profile")
    public UserProfileResponse getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserProfileResponse(user.getId(), user.getName(), user.getEmail());
    }
}
