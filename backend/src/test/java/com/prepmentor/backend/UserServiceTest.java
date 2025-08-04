package com.prepmentor.backend;

import com.prepmentor.backend.model.User;
import com.prepmentor.backend.repository.UserRepository;
import com.prepmentor.backend.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerUser_success() {
        String name = "Test User";
        String email = "test@example.com";
        String rawPassword = "password";
        String encodedPassword = "encodedPassword";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(rawPassword)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User user = userService.registerUser(name, email, rawPassword);

        Assertions.assertEquals(name, user.getName());
        Assertions.assertEquals(email, user.getEmail());
        Assertions.assertEquals(encodedPassword, user.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void registerUser_duplicateEmail_throwsException() {
        String name = "Test User";
        String email = "test@example.com";
        String rawPassword = "password";

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(new User()));

        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            userService.registerUser(name, email, rawPassword);
        });
        verify(userRepository, never()).save(any(User.class));
    }
}