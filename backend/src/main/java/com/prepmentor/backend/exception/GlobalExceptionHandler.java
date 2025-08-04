package com.prepmentor.backend.exception;

import com.prepmentor.backend.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Global exception handler for REST controllers.
 * Handles validation errors, not found exceptions, bad requests, and generic
 * runtime exceptions.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // -----------------------------
    // Handle validation errors
    // -----------------------------
    /**
     * Handles validation errors for method arguments.
     *
     * @param ex the MethodArgumentNotValidException
     * @return a response entity with validation error details
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        ApiResponse<Void> response = new ApiResponse<>(
                400,
                "Validation failed",
                null,
                errors);

        return ResponseEntity.badRequest().body(response);
    }

    // -----------------------------
    // Handle NotFoundException
    // -----------------------------
    /**
     * Handles NotFoundException and returns a 404 response.
     *
     * @param ex the NotFoundException
     * @return a response entity with not found error details
     */
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFoundException(NotFoundException ex) {
        ApiResponse<Void> response = new ApiResponse<>(
                404,
                ex.getMessage(),
                null,
                List.of(ex.getMessage()));

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // -----------------------------
    // Handle all other runtime exceptions
    // -----------------------------
    /**
     * Handles generic runtime exceptions and returns a 500 response.
     *
     * @param ex the RuntimeException
     * @return a response entity with internal server error details
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Void>> handleRuntimeException(RuntimeException ex) {
        ApiResponse<Void> response = new ApiResponse<>(
                500,
                "Internal server error",
                null,
                List.of(ex.getMessage()));

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    // -----------------------------
    // Handle BadRequestException
    // -----------------------------
    /**
     * Handles BadRequestException and returns a 400 response.
     *
     * @param ex the BadRequestException
     * @return a response entity with bad request error details
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<String>> handleBadRequest(BadRequestException ex) {
        ApiResponse<String> response = new ApiResponse<>(
                400,
                ex.getMessage(),
                null,
                null);
        return ResponseEntity.badRequest().body(response);
    }
}
