package com.prepmentor.backend.service;

import com.prepmentor.backend.dto.QuestionSetRequest;
import com.prepmentor.backend.enums.QuestionSetStatus;
import com.prepmentor.backend.exception.BadRequestException;
import com.prepmentor.backend.exception.NotFoundException;
import com.prepmentor.backend.model.Question;
import com.prepmentor.backend.model.QuestionSet;
import com.prepmentor.backend.repository.QuestionSetRepository;
import com.prepmentor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for managing question set-related operations such as creation,
 * retrieval, confirmation, and user association.
 */
@Service
public class QuestionSetService {

    @Autowired
    private QuestionSetRepository questionSetRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieves all question sets created by a specific user.
     *
     * @param userId the user ID
     * @return a list of question sets created by the user
     */
    public List<QuestionSet> getQuestionSetsByUser(Long userId) {
        return questionSetRepository.findByCreatedById(userId);
    }

    /**
     * Creates a draft question set with the provided questions and user
     * association.
     *
     * @param req       the question set request
     * @param userId    the user ID
     * @param questions the list of question texts
     * @return the ID of the created question set
     */
    public Long createDraftQuestionSet(QuestionSetRequest req, Long userId, List<String> questions) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id " + userId));

        QuestionSet qs = QuestionSet.builder()
                .name(req.getName())
                .createdAt(Instant.now())
                .createdBy(user)
                .type(req.getType())
                .difficulty(req.getDifficulty())
                .tags(req.getTags())
                .status(QuestionSetStatus.DRAFT)
                .build();

        List<Question> questionEntities = questions.stream()
                .map(q -> Question.builder()
                        .text(q)
                        .type(req.getType())
                        .difficulty(req.getDifficulty())
                        .tags(req.getTags())
                        .questionSet(qs)
                        .build())
                .collect(Collectors.toList());

        qs.setQuestions(questionEntities);
        questionSetRepository.save(qs);

        return qs.getId();
    }

    /**
     * Retrieves a question set by its ID.
     *
     * @param id the question set ID
     * @return the QuestionSet entity
     * @throws NotFoundException if the question set is not found
     */
    public QuestionSet getQuestionSetById(Long id) {
        return questionSetRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Question set not found with id " + id));
    }

    /**
     * Confirms and publishes a question set by its ID.
     *
     * @param id the question set ID
     * @throws NotFoundException   if the question set is not found
     * @throws BadRequestException if the question set is not in draft status
     */
    public void confirmQuestionSet(Long id) {
        QuestionSet qs = questionSetRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Question set not found with id " + id));

        if (qs.getStatus() != QuestionSetStatus.DRAFT) {
            throw new BadRequestException("Question set already published or not in draft status");
        }

        qs.setStatus(QuestionSetStatus.PUBLISHED);
        questionSetRepository.save(qs);
    }

    /**
     * Retrieves the user ID by email address.
     *
     * @param email the user's email address
     * @return the user ID
     * @throws NotFoundException if the user is not found
     */
    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found")).getId();
    }
}
