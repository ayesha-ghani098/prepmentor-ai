package com.prepmentor.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing a question in the system.
 * <p>
 * Fields:
 * <ul>
 * <li>id - Unique identifier for the question.</li>
 * <li>text - The text of the question.</li>
 * <li>type - The type/category of the question.</li>
 * <li>difficulty - The difficulty level of the question.</li>
 * <li>tags - Tags associated with the question.</li>
 * <li>questionSet - The question set this question belongs to.</li>
 * </ul>
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "question")
public class Question {
    /**
     * The unique identifier for the question.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The text of the question.
     */
    private String text;

    /**
     * The type/category of the question.
     */
    private String type;

    /**
     * The difficulty level of the question.
     */
    private String difficulty;

    /**
     * Tags associated with the question.
     */
    private String tags;

    /**
     * The question set this question belongs to.
     */
    @ManyToOne
    private QuestionSet questionSet;
}
