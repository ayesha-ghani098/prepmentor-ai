package com.prepmentor.backend.exception;

/**
 * Exception thrown when a bad request is made (HTTP 400).
 */
public class BadRequestException extends RuntimeException {
    /**
     * Constructs a new BadRequestException with the specified detail message.
     *
     * @param message the detail message
     */
    public BadRequestException(String message) {
        super(message);
    }
}
