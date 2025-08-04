package com.prepmentor.backend.controller;

import com.prepmentor.backend.common.ApiResponse;
import com.prepmentor.backend.dto.QuestionPreviewResponse;
import com.prepmentor.backend.service.QuestionService;
import com.prepmentor.backend.service.QuestionSetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for handling question-related endpoints such as fetching and
 * filtering questions.
 * <p>
 * Endpoints:
 * <ul>
 * <li>GET /api/questions - Retrieve a paginated and filtered list of
 * questions.</li>
 * <li>GET /api/questions/{id} - Retrieve all questions for a specific question
 * set.</li>
 * </ul>
 */
@Slf4j
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

        @Autowired
        private QuestionService questionService;

        @Autowired
        private QuestionSetService questionSetService;

        /**
         * Retrieves a paginated and filtered list of questions.
         *
         * @param page       the page number
         * @param size       the page size
         * @param type       the question type filter
         * @param difficulty the difficulty filter
         * @return a paginated response of question previews
         */
        @GetMapping
        public ResponseEntity<ApiResponse<Page<QuestionPreviewResponse>>> getQuestions(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size,
                        @RequestParam(required = false) String type,
                        @RequestParam(required = false) String difficulty) {
                log.info("Fetching questions: page={}, size={}, type={}, difficulty={}", page, size, type, difficulty);
                Page<QuestionPreviewResponse> questions = questionService.getQuestions(page, size, type, difficulty);

                String msg = questions.isEmpty()
                                ? "No questions found for these filters"
                                : "Questions fetched successfully";

                return ResponseEntity.ok(new ApiResponse<>(200, msg, questions, Collections.emptyList()));
        }

        /**
         * Retrieves all questions for a specific question set.
         *
         * @param id the question set ID
         * @return a list of question previews for the set
         */
        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<List<QuestionPreviewResponse>>> getQuestionsBySet(@PathVariable Long id) {
                log.info("Fetching questions for question set ID: {}", id);
                // Ensures question set exists; will throw 404 if not
                questionSetService.getQuestionSetById(id);

                List<QuestionPreviewResponse> responses = questionService.getQuestionsBySet(id)
                                .stream()
                                .map(q -> new QuestionPreviewResponse(
                                                q.getId(),
                                                q.getText(),
                                                q.getType(),
                                                q.getDifficulty(),
                                                q.getTags()))
                                .collect(Collectors.toList());

                String msg = responses.isEmpty()
                                ? "No questions found for this question set"
                                : "Questions fetched successfully for set";

                return ResponseEntity.ok(new ApiResponse<>(200, msg, responses, Collections.emptyList()));
        }
}
