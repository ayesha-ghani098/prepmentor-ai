package com.prepmentor.backend.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Standard API response wrapper for REST endpoints.
 *
 * @param <T> the type of the response data
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    /**
     * The HTTP status code of the response.
     */
    private int statusCode;
    /**
     * The message describing the response.
     */
    private String message;
    /**
     * The response data payload.
     */
    private T data;
    /**
     * List of error messages, if any.
     */
    private List<String> errors;
}
