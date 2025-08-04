package com.prepmentor.backend.service;

import com.prepmentor.backend.model.User;
import com.prepmentor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service for managing user-related operations such as registration, retrieval,
 * and persistence.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves all users from the database.
     *
     * @return a list of all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Finds a user by their email address.
     *
     * @param email the email to search for
     * @return an Optional containing the user if found, or empty if not
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Saves a user entity to the database.
     *
     * @param user the user to save
     * @return the saved user entity
     */
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Registers a new user with the given details. Throws an exception if the email
     * is already registered.
     *
     * @param name        the user's name
     * @param email       the user's email
     * @param rawPassword the user's password in plain text
     * @return the registered User entity
     * @throws IllegalArgumentException if the email is already registered
     */
    public User registerUser(String name, String email, String rawPassword) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email is already registered");
        }
        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .build();
        return userRepository.save(user);
    }
}
