package com.prepmentor.backend.dto;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

/**
 * DTO for returning dashboard statistics and insights to the client.
 * <p>
 * This response includes user performance metrics such as average score,
 * total questions answered, and questions that need improvement.
 */
@Getter
@ToString
public class DashboardResponse {

    private final Double averageScore;
    private final Integer questionsAnsweredCount;
    private final List<LowScoreQuestion> lowScoreQuestions;

    /**
     * Constructs a DashboardResponse with user performance data.
     *
     * @param averageScore the average score across all answered questions
     * @param questionsAnsweredCount the total number of questions answered
     * @param lowScoreQuestions list of questions with low scores that need improvement
     */
    public DashboardResponse(Double averageScore, Integer questionsAnsweredCount, List<LowScoreQuestion> lowScoreQuestions) {
        this.averageScore = averageScore;
        this.questionsAnsweredCount = questionsAnsweredCount;
        this.lowScoreQuestions = lowScoreQuestions;
    }

    /**
     * Inner class representing a question with low score that needs improvement.
     */
    @Getter
    @ToString
    public static class LowScoreQuestion {
        private final Long questionId;
        private final String questionText;
        private final Integer score;
        private final String submittedAt;

        /**
         * Constructs a LowScoreQuestion with question details and score.
         *
         * @param questionId the ID of the question
         * @param questionText the text of the question
         * @param score the score achieved on this question
         * @param submittedAt the timestamp when the answer was submitted
         */
        public LowScoreQuestion(Long questionId, String questionText, Integer score, String submittedAt) {
            this.questionId = questionId;
            this.questionText = questionText;
            this.score = score;
            this.submittedAt = submittedAt;
        }
    }
} 