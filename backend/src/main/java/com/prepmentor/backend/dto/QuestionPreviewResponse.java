package com.prepmentor.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * DTO for previewing question details in a list or summary view.
 */
@Getter
@ToString
public class QuestionPreviewResponse {
    private final Long id;
    private final String text;
    private final String type;
    private final String difficulty;
    private final String tags;

    /**
     * Constructs a QuestionPreviewResponse with all question details.
     *
     * @param id         the question ID
     * @param text       the question text
     * @param type       the question type
     * @param difficulty the question difficulty
     * @param tags       the question tags
     */
    public QuestionPreviewResponse(Long id, String text, String type, String difficulty, String tags) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.difficulty = difficulty;
        this.tags = tags;
    }
}
