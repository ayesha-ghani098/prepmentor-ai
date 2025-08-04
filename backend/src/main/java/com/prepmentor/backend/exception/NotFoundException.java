package com.prepmentor.backend.exception;

/**
 * Exception thrown when a requested resource is not found (HTTP 404).
 */
public class NotFoundException extends RuntimeException {
    /**
     * Constructs a new NotFoundException with the specified detail message.
     *
     * @param message the detail message
     */
    public NotFoundException(String message) {
        super(message);
    }
}
