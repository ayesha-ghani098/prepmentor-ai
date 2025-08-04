package com.prepmentor.backend.repository;

import com.prepmentor.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository interface for managing User entities.
 * Extends JpaRepository to provide CRUD operations and custom queries.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Finds a user by their email address.
     *
     * @param email the user's email address
     * @return an Optional containing the user if found, or empty if not
     */
    Optional<User> findByEmail(String email);
}
