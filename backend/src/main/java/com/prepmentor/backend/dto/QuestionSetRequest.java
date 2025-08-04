package com.prepmentor.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO for creating or generating a question set.
 * Contains fields for name, type, difficulty, tags, and quantity.
 */
@Data
public class QuestionSetRequest {

        /**
         * The name of the question set.
         */
        @NotBlank(message = "Name is required")
        private String name;

        /**
         * The type/category of the question set.
         */
        @NotBlank(message = "Type is required")
        private String type;

        /**
         * The difficulty level of the question set.
         */
        @NotBlank(message = "Difficulty Level is required")
        private String difficulty;

        /**
         * Tags associated with the question set.
         */
        private String tags;

        /**
         * The number of questions to generate in the set.
         */
        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Must request at least 1 question")
        private Integer quantity;

}
