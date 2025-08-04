package com.prepmentor.backend.dto;

import com.prepmentor.backend.model.Question;
import com.prepmentor.backend.model.QuestionSet;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO for returning question set details to the client.
 */
@Getter
@ToString
public class QuestionSetResponse {

    private final Long id;
    private final String name;
    private final String type;
    private final String difficulty;
    private final String tags;
    private final String status;
    private final List<String> questions;

    /**
     * Constructs a QuestionSetResponse from a QuestionSet entity.
     *
     * @param qs the QuestionSet entity
     */
    public QuestionSetResponse(QuestionSet qs) {
        this.id = qs.getId();
        this.name = qs.getName();
        this.type = qs.getType();
        this.difficulty = qs.getDifficulty();
        this.tags = qs.getTags();
        this.status = qs.getStatus().name();
        this.questions = qs.getQuestions()
                .stream()
                .map(Question::getText)
                .collect(Collectors.toList());
    }
}
