package com.prepmentor.backend.repository;

import com.prepmentor.backend.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository interface for managing Question entities.
 * Extends JpaRepository to provide CRUD operations and custom queries.
 */
public interface QuestionRepository extends JpaRepository<Question, Long> {

    /**
     * Finds questions by type and difficulty, case-insensitive, with pagination.
     *
     * @param type       the type filter
     * @param difficulty the difficulty filter
     * @param pageable   the pagination information
     * @return a page of questions matching the filters
     */
    Page<Question> findByTypeContainingIgnoreCaseAndDifficultyContainingIgnoreCase(
            String type,
            String difficulty,
            Pageable pageable);

    /**
     * Finds all questions belonging to a specific question set.
     *
     * @param questionSetId the ID of the question set
     * @return a list of questions in the set
     */
    List<Question> findByQuestionSetId(Long questionSetId);

}
