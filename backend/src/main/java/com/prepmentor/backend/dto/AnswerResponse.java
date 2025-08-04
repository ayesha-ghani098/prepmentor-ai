package com.prepmentor.backend.dto;

import com.prepmentor.backend.model.Answer;
import lombok.Getter;
import lombok.ToString;

import java.time.Instant;

/**
 * DTO for returning answer details and feedback to the client.
 * <p>
 * This response includes detailed scoring information for different aspects
 * of the answer including correctness, completeness, clarity, and overall
 * score, as well as the question text for context.
 */
@Getter
@ToString
public class AnswerResponse {

    private final Long id;
    private final String text;
    private final String fileUrl;
    private final String answerType;
    private final Instant submittedAt;
    private final Long questionId;
    private final String questionText;
    private final Long userId;
    private final String feedback;
    private final Integer score;
    private final Integer correctness;
    private final Integer completeness;
    private final Integer clarity;

    /**
     * Constructs an AnswerResponse from an Answer entity.
     *
     * @param answer the Answer entity
     */
    public AnswerResponse(Answer answer) {
        this.id = answer.getId();
        this.text = answer.getText();
        this.fileUrl = answer.getFileUrl();
        this.answerType = answer.getAnswerType().name();
        this.submittedAt = answer.getSubmittedAt();
        this.questionId = answer.getQuestion() != null ? answer.getQuestion().getId() : null;
        this.questionText = answer.getQuestion() != null ? answer.getQuestion().getText() : null;
        this.userId = answer.getUser() != null ? answer.getUser().getId() : null;
        this.feedback = answer.getFeedback();
        this.score = answer.getScore();
        this.correctness = answer.getCorrectness();
        this.completeness = answer.getCompleteness();
        this.clarity = answer.getClarity();
    }
}
