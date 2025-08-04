package com.prepmentor.backend.repository;

import com.prepmentor.backend.model.QuestionSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository interface for managing QuestionSet entities.
 * Extends JpaRepository to provide CRUD operations and custom queries.
 */
public interface QuestionSetRepository extends JpaRepository<QuestionSet, Long> {
    /**
     * Finds all question sets created by a specific user.
     *
     * @param userId the user ID
     * @return a list of question sets created by the user
     */
    List<QuestionSet> findByCreatedById(Long userId);

}
