package com.prepmentor.backend.service;

import com.prepmentor.backend.dto.AnswerRequest;
import com.prepmentor.backend.enums.AnswerType;
import com.prepmentor.backend.model.Answer;
import com.prepmentor.backend.model.Question;
import com.prepmentor.backend.model.User;
import com.prepmentor.backend.repository.AnswerRepository;
import com.prepmentor.backend.repository.QuestionRepository;
import com.prepmentor.backend.repository.UserRepository;
import com.prepmentor.backend.util.S3Uploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.prepmentor.backend.dto.DashboardResponse;
import java.util.List;
import java.util.Collections;
import java.util.stream.Collectors;

/**
 * Service for handling answer-related business logic, including uploading
 * answers and associating them with users and questions.
 */
@Service
public class AnswerService {

        @Autowired
        private QuestionRepository questionRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private AnswerRepository answerRepository;

        @Autowired
        private S3Uploader s3Uploader;

        /**
         * Handles the upload of an answer, associates it with the user and question,
         * and saves it. If an answer already exists for the user and question,
         * it will be updated instead of creating a new one.
         *
         * @param request the answer request containing answer details
         * @param userId  the ID of the user submitting the answer
         * @return an array containing [Answer entity, boolean isUpdate]
         * @throws ResponseStatusException if the question or user is not found
         */
        public Object[] handleAnswerUpload(AnswerRequest request, Long userId) {
                Question question = questionRepository.findById(request.getQuestionId())
                                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Question not found"));

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));

                // Check if an answer already exists for this user and question
                Answer existingAnswer = answerRepository.findByUser_IdAndQuestion_Id(userId, request.getQuestionId())
                                .orElse(null);

                String fileUrl = null;

                if (!request.getAnswerType().equalsIgnoreCase("TEXT")) {
                        fileUrl = s3Uploader.uploadBase64File(
                                        request.getFileBase64(),
                                        request.getFilename(),
                                        request.getFileType());
                }

                Answer answer;
                boolean isUpdate = false;
                if (existingAnswer != null) {
                        // Update existing answer
                        existingAnswer.setText(request.getAnswerText());
                        existingAnswer.setFileUrl(fileUrl);
                        existingAnswer.setAnswerType(AnswerType.valueOf(request.getAnswerType().toUpperCase()));
                        existingAnswer.setSubmittedAt(Instant.now());
                        // Clear previous feedback since we're updating the answer
                        existingAnswer.setScore(null);
                        existingAnswer.setCorrectness(null);
                        existingAnswer.setCompleteness(null);
                        existingAnswer.setClarity(null);
                        existingAnswer.setFeedback(null);
                        answer = existingAnswer;
                        isUpdate = true;
                } else {
                        // Create new answer
                        answer = Answer.builder()
                                        .text(request.getAnswerText())
                                        .fileUrl(fileUrl)
                                        .answerType(AnswerType.valueOf(request.getAnswerType().toUpperCase()))
                                        .submittedAt(Instant.now())
                                        .question(question)
                                        .user(user)
                                        .build();
                }

                Answer savedAnswer = answerRepository.save(answer);
                return new Object[] { savedAnswer, isUpdate };
        }

        /**
         * Retrieves the user ID by email address.
         *
         * @param email the user's email address
         * @return the user ID
         * @throws ResponseStatusException if the user is not found
         */
        public Long getUserIdByEmail(String email) {
                return userRepository.findByEmail(email)
                                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found")).getId();
        }

        /**
         * Parses the OpenAI feedback string and updates the Answer entity with feedback
         * fields.
         *
         * @param answer   the Answer entity to update
         * @param feedback the feedback string from OpenAI
         */
        public void applyFeedbackToAnswer(Answer answer, String feedback) {
                if (feedback == null)
                        return;
                try {
                        // Example feedback format:
                        // Score (overall, out of 5): 1
                        // Correctness (0-5): 0
                        // Completeness (0-5): 1
                        // Clarity (0-5): 2
                        // Feedback: [text feedback here]
                        String[] lines = feedback.split("\\n");
                        StringBuilder feedbackText = new StringBuilder();
                        boolean inFeedbackSection = false;

                        for (String line : lines) {
                                if (line.startsWith("Score")) {
                                        answer.setScore(parseIntFromLine(line));
                                } else if (line.startsWith("Correctness")) {
                                        answer.setCorrectness(parseIntFromLine(line));
                                } else if (line.startsWith("Completeness")) {
                                        answer.setCompleteness(parseIntFromLine(line));
                                } else if (line.startsWith("Clarity")) {
                                        answer.setClarity(parseIntFromLine(line));
                                } else if (line.startsWith("Feedback:")) {
                                        inFeedbackSection = true;
                                        String feedbackContent = line.replaceFirst("Feedback:", "").trim();
                                        if (!feedbackContent.isEmpty()) {
                                                feedbackText.append(feedbackContent);
                                        }
                                } else if (inFeedbackSection && !line.trim().isEmpty()) {
                                        // Continue collecting feedback text for subsequent lines
                                        feedbackText.append(" ").append(line.trim());
                                }
                        }

                        if (feedbackText.length() > 0) {
                                answer.setFeedback(feedbackText.toString().trim());
                        }
                } catch (Exception e) {
                        // fallback: just set feedback text
                        answer.setFeedback(feedback);
                }
        }

        /**
         * Saves the given Answer entity to the database.
         *
         * @param answer the Answer entity to save
         * @return the saved Answer entity
         */
        public Answer save(Answer answer) {
                return answerRepository.save(answer);
        }

        /**
         * Retrieves an answer by user ID and question ID.
         *
         * @param userId     the ID of the user
         * @param questionId the ID of the question
         * @return an Optional containing the Answer entity if found, empty otherwise
         */
        public Optional<Answer> getAnswerByUserIdAndQuestionId(Long userId, Long questionId) {
                return answerRepository.findByUser_IdAndQuestion_Id(userId, questionId);
        }

        /**
         * Calculates dashboard statistics for a user including average score,
         * questions answered count, and low score questions.
         *
         * @param userId the ID of the user
         * @return DashboardResponse containing user performance metrics
         */
        public DashboardResponse getDashboardStats(Long userId) {
                // Get all answers for the user with scores
                List<Answer> userAnswers = answerRepository.findByUserIdAndScoreIsNotNull(userId);
                
                if (userAnswers.isEmpty()) {
                        return new DashboardResponse(0.0, 0, Collections.emptyList());
                }
                
                // Calculate average score
                double averageScore = userAnswers.stream()
                                .mapToInt(Answer::getScore)
                                .average()
                                .orElse(0.0);
                
                // Get questions answered count
                int questionsAnsweredCount = userAnswers.size();
                
                // Get low score questions (score <= 2 out of 5)
                List<DashboardResponse.LowScoreQuestion> lowScoreQuestions = userAnswers.stream()
                                .filter(answer -> answer.getScore() != null && answer.getScore() <= 2)
                                .sorted((a1, a2) -> a2.getSubmittedAt().compareTo(a1.getSubmittedAt())) // Most recent first
                                .limit(5) // Limit to last 5 low score questions
                                .map(answer -> new DashboardResponse.LowScoreQuestion(
                                                answer.getQuestion().getId(),
                                                answer.getQuestion().getText(),
                                                answer.getScore(),
                                                answer.getSubmittedAt().toString()))
                                .collect(Collectors.toList());
                
                return new DashboardResponse(averageScore, questionsAnsweredCount, lowScoreQuestions);
        }

        private Integer parseIntFromLine(String line) {
                String[] parts = line.split(":");
                if (parts.length > 1) {
                        String num = parts[1].replaceAll("[^0-9]", "").trim();
                        if (!num.isEmpty())
                                return Integer.parseInt(num);
                }
                return null;
        }
}
