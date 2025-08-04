package com.prepmentor.backend.service;

import com.prepmentor.backend.dto.QuestionPreviewResponse;
import com.prepmentor.backend.model.Question;
import com.prepmentor.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for managing question-related operations such as retrieval and
 * filtering.
 */
@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    /**
     * Retrieves a paginated and filtered list of questions.
     *
     * @param page       the page number
     * @param size       the page size
     * @param type       the question type filter
     * @param difficulty the difficulty filter
     * @return a paginated response of question previews
     */
    public Page<QuestionPreviewResponse> getQuestions(int page, int size, String type, String difficulty) {
        String typeFilter = (type == null || type.isEmpty()) ? "" : type;
        String difficultyFilter = (difficulty == null || difficulty.isEmpty()) ? "" : difficulty;

        PageRequest pageRequest = PageRequest.of(page, size);

        Page<Question> questionPage = questionRepository
                .findByTypeContainingIgnoreCaseAndDifficultyContainingIgnoreCase(
                        typeFilter,
                        difficultyFilter,
                        pageRequest);

        return questionPage.map(q -> new QuestionPreviewResponse(
                q.getId(),
                q.getText(),
                q.getType(),
                q.getDifficulty(),
                q.getTags()));
    }

    /**
     * Retrieves all questions for a specific question set.
     *
     * @param questionSetId the ID of the question set
     * @return a list of questions in the set
     */
    public List<Question> getQuestionsBySet(Long questionSetId) {
        return questionRepository.findByQuestionSetId(questionSetId);
    }

    /**
     * Retrieves a question by its ID.
     *
     * @param id the question ID
     * @return the Question entity
     * @throws RuntimeException if the question is not found
     */
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id " + id));
    }
}
