package com.prepmentor.backend.model;

import com.prepmentor.backend.enums.QuestionSetStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

/**
 * Entity representing a set of questions, typically grouped for an interview or
 * quiz.
 * <p>
 * Fields:
 * <ul>
 * <li>id - Unique identifier for the question set.</li>
 * <li>name - Name of the question set.</li>
 * <li>createdAt - Timestamp when the set was created.</li>
 * <li>createdBy - The user who created the set.</li>
 * <li>type - The type/category of the set.</li>
 * <li>difficulty - The difficulty level of the set.</li>
 * <li>tags - Tags associated with the set.</li>
 * <li>status - The status of the set (DRAFT, PUBLISHED).</li>
 * <li>questions - List of questions in the set.</li>
 * </ul>
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "question_set")
public class QuestionSet {
    /**
     * The unique identifier for the question set.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Name of the question set.
     */
    private String name;

    /**
     * Timestamp when the set was created.
     */
    private Instant createdAt;

    /**
     * The user who created the set.
     */
    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    /**
     * The type/category of the set.
     */
    private String type;

    /**
     * The difficulty level of the set.
     */
    private String difficulty;

    /**
     * Tags associated with the set.
     */
    private String tags;

    /**
     * The status of the set (DRAFT, PUBLISHED).
     */
    @Enumerated(EnumType.STRING)
    private QuestionSetStatus status;

    /**
     * List of questions in the set.
     */
    @OneToMany(mappedBy = "questionSet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;
}
