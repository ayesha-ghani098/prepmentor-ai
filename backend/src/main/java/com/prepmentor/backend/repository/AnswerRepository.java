package com.prepmentor.backend.repository;

import com.prepmentor.backend.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing Answer entities.
 * Extends JpaRepository to provide CRUD operations and custom queries.
 */
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    
    /**
     * Finds an answer by user ID and question ID.
     *
     * @param userId the ID of the user
     * @param questionId the ID of the question
     * @return an Optional containing the answer if found, empty otherwise
     */
    Optional<Answer> findByUser_IdAndQuestion_Id(Long userId, Long questionId);
    
    /**
     * Finds all answers for a user that have scores (feedback has been generated).
     *
     * @param userId the ID of the user
     * @return a list of answers with scores
     */
    List<Answer> findByUserIdAndScoreIsNotNull(Long userId);
}
