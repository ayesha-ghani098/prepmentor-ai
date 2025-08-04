package com.prepmentor.backend.controller;

import com.prepmentor.backend.common.ApiResponse;
import com.prepmentor.backend.dto.QuestionSetRequest;
import com.prepmentor.backend.dto.QuestionSetResponse;
import com.prepmentor.backend.model.QuestionSet;
import com.prepmentor.backend.service.OpenAIService;
import com.prepmentor.backend.service.QuestionSetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Controller for handling question set-related endpoints such as generating,
 * retrieving, and confirming question sets.
 * <p>
 * Endpoints:
 * <ul>
 * <li>POST /api/question-sets/generate - Generate a new question set using
 * OpenAI.</li>
 * <li>GET /api/question-sets - Retrieve all question sets for the authenticated
 * user.</li>
 * <li>GET /api/question-sets/{id} - Retrieve a specific question set by
 * ID.</li>
 * <li>POST /api/question-sets/{id}/confirm - Confirm and publish a question
 * set.</li>
 * </ul>
 */
@RestController
@RequestMapping("/api/question-sets")
public class QuestionSetController {

        @Autowired
        private QuestionSetService questionSetService;

        @Autowired
        private OpenAIService openAIService;

        /**
         * Generates a new question set using OpenAI and saves it as a draft.
         *
         * @param req the question set request containing generation parameters
         * @return a response entity with the ID of the created question set
         * @throws IOException if OpenAI API call fails
         */
        @PostMapping("/generate")
        public ResponseEntity<ApiResponse<Long>> generateQuestions(@Valid @RequestBody QuestionSetRequest req)
                        throws IOException {

                List<String> questions = openAIService.generateQuestions(req);
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String email = authentication.getName();
                Long userId = questionSetService.getUserIdByEmail(email);
                Long questionSetId = questionSetService.createDraftQuestionSet(req, userId, questions);

                return ResponseEntity.ok(new ApiResponse<>(
                                200,
                                "Questions generated and saved as draft",
                                questionSetId,
                                Collections.emptyList()));
        }

        /**
         * Retrieves all question sets for the authenticated user.
         *
         * @return a response entity with a list of question set responses
         */
        @GetMapping
        public ResponseEntity<ApiResponse<List<QuestionSetResponse>>> getQuestionSetsByUser() {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String email = authentication.getName();
                Long userId = questionSetService.getUserIdByEmail(email);
                List<QuestionSet> sets = questionSetService.getQuestionSetsByUser(userId);

                List<QuestionSetResponse> responses = sets.stream()
                                .map(QuestionSetResponse::new)
                                .collect(Collectors.toList());

                String message = responses.isEmpty()
                                ? "No question sets found for this user"
                                : "Question sets fetched successfully";

                return ResponseEntity.ok(new ApiResponse<>(
                                200, message, responses, Collections.emptyList()));
        }

        /**
         * Retrieves a specific question set by its ID.
         *
         * @param id the question set ID
         * @return a response entity with the question set response
         */
        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<QuestionSetResponse>> getQuestionSet(@PathVariable Long id) {
                QuestionSet qs = questionSetService.getQuestionSetById(id);
                return ResponseEntity.ok(new ApiResponse<>(
                                200, "Question set loaded", new QuestionSetResponse(qs), Collections.emptyList()));
        }

        /**
         * Confirms and publishes a question set by its ID.
         *
         * @param id the question set ID
         * @return a response entity indicating confirmation
         */
        @PostMapping("/{id}/confirm")
        public ResponseEntity<ApiResponse<String>> confirmQuestionSet(@PathVariable Long id) {
                questionSetService.confirmQuestionSet(id);
                return ResponseEntity.ok(new ApiResponse<>(
                                200, "Question set confirmed & published", null, Collections.emptyList()));
        }
}
