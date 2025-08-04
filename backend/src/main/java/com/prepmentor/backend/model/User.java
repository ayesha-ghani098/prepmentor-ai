package com.prepmentor.backend.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity representing a user in the system.
 * <p>
 * Fields:
 * <ul>
 * <li>id - Unique identifier for the user.</li>
 * <li>name - Full name of the user.</li>
 * <li>email - Unique email address of the user.</li>
 * <li>password - Hashed password of the user.</li>
 * </ul>
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    /**
     * The unique identifier for the user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user's full name.
     */
    private String name;

    /**
     * The user's email address. Must be unique.
     */
    @Column(unique = true)
    private String email;

    /**
     * The user's hashed password.
     */
    private String password;
}
