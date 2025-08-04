package com.prepmentor.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO for submitting an answer to a question.
 * Contains fields for text, file, and answer type, with validation logic.
 */
@Data
public class AnswerRequest {

    /**
     * The ID of the question being answered.
     */
    @NotNull
    private Long questionId;

    /**
     * The answer text (for TEXT type answers).
     */
    private String answerText;

    /**
     * The base64-encoded file data (for AUDIO/VIDEO type answers).
     */
    private String fileBase64;

    /**
     * The MIME type of the uploaded file.
     */
    private String fileType;

    /**
     * The filename of the uploaded file.
     */
    private String filename;

    /**
     * The type of answer (TEXT, AUDIO, VIDEO).
     */
    @NotNull
    private String answerType; // TEXT, AUDIO, VIDEO

    /**
     * Validates the answer request based on the answer type.
     *
     * @return true if the request is valid for the specified answer type, false
     *         otherwise
     */
    @jakarta.validation.constraints.AssertTrue(message = "Invalid input based on answerType")
    public boolean isValidByAnswerType() {
        if (answerType == null)
            return false;

        switch (answerType.toUpperCase()) {
            case "TEXT":
                return answerText != null && !answerText.trim().isEmpty();

            case "AUDIO":
            case "VIDEO":
                return fileBase64 != null && !fileBase64.trim().isEmpty()
                        && fileType != null && !fileType.trim().isEmpty()
                        && filename != null && !filename.trim().isEmpty();

            default:
                return false; // invalid answerType
        }
    }
}
