package com.prepmentor.backend.controller;

import com.prepmentor.backend.common.ApiResponse;
import com.prepmentor.backend.dto.AnswerRequest;
import com.prepmentor.backend.dto.AnswerResponse;
import com.prepmentor.backend.model.Answer;

import com.prepmentor.backend.service.AnswerService;
import com.prepmentor.backend.service.OpenAIService;
import com.prepmentor.backend.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Controller for handling answer-related endpoints such as uploading/updating
 * answers
 * and generating feedback.
 * <p>
 * Endpoints:
 * <ul>
 * <li>POST /api/answers - Upload or update an answer for a question and receive
 * feedback.</li>
 * <li>GET /api/answers/{questionId} - Get an answer with feedback for a
 * specific question.</li>
 * </ul>
 */
@Slf4j
@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private QuestionService questionService;

    /**
     * Uploads or updates an answer for a question and generates feedback using
     * OpenAI.
     * If an answer already exists for the user and question, it will be updated.
     *
     * @param request the answer request containing answer details
     * @return a response entity with the uploaded/updated answer details and
     *         feedback
     */
    @PostMapping
    public ResponseEntity<ApiResponse<AnswerResponse>> uploadAnswer(@Valid @RequestBody AnswerRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Long userId = answerService.getUserIdByEmail(email);
        log.info("Uploading answer for questionId: {}, userId: {} (from token)", request.getQuestionId(), userId);

        Object[] result = answerService.handleAnswerUpload(request, userId);
        Answer answer = (Answer) result[0];
        boolean isUpdate = (Boolean) result[1];

        try {
            // Fetch the question text
            var question = questionService.getQuestionById(request.getQuestionId());
            String openAIFeedback = openAIService.generateFeedback(question.getText(), answer.getText());
            // Parse and apply feedback fields to the answer
            answerService.applyFeedbackToAnswer(answer, openAIFeedback);
            answerService.save(answer); // persist feedback fields
        } catch (Exception e) {
            log.error("Failed to generate feedback from OpenAI", e);
            answer.setFeedback("Feedback not available at the moment.");
            answerService.save(answer);
        }

        AnswerResponse dto = new AnswerResponse(answer);
        String message = isUpdate ? "Answer updated successfully" : "Answer uploaded successfully";
        log.info("{} for questionId: {}, userId: {}", message, request.getQuestionId(), userId);

        ApiResponse<AnswerResponse> response = new ApiResponse<>(200, message, dto, Collections.emptyList());
        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves an answer with feedback for a specific question by the
     * authenticated user.
     *
     * @param questionId the ID of the question
     * @return a response entity with the answer details and feedback, or a response
     *         indicating no answer exists
     */
    @GetMapping("/{questionId}")
    public ResponseEntity<ApiResponse<AnswerResponse>> getAnswerByQuestionId(@PathVariable Long questionId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Long userId = answerService.getUserIdByEmail(email);
        log.info("Retrieving answer for questionId: {}, userId: {} (from token)", questionId, userId);

        Optional<Answer> answerOptional = answerService.getAnswerByUserIdAndQuestionId(userId, questionId);

        if (answerOptional.isPresent()) {
            Answer answer = answerOptional.get();
            AnswerResponse dto = new AnswerResponse(answer);
            ApiResponse<AnswerResponse> response = new ApiResponse<>(200, "Answer retrieved successfully", dto,
                    Collections.emptyList());
            return ResponseEntity.ok(response);
        } else {
            log.info("No answer found for questionId: {}, userId: {}", questionId, userId);
            ApiResponse<AnswerResponse> response = new ApiResponse<>(200, "No answer found for this question", null,
                    Collections.emptyList());
            return ResponseEntity.ok(response);
        }
    }

}
