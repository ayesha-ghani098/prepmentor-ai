package com.prepmentor.backend.controller;

import com.prepmentor.backend.common.ApiResponse;
import com.prepmentor.backend.dto.DashboardResponse;
import com.prepmentor.backend.service.AnswerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

/**
 * Controller for handling dashboard-related endpoints such as user statistics
 * and performance metrics.
 * <p>
 * Endpoints:
 * <ul>
 * <li>GET /api/dashboard - Get user dashboard statistics including average score,
 * questions answered count, and low score questions.</li>
 * </ul>
 */
@Slf4j
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private AnswerService answerService;

    /**
     * Retrieves dashboard statistics for the authenticated user.
     *
     * @return a response entity with dashboard statistics including average score,
     * questions answered count, and low score questions
     */
    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboardStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Long userId = answerService.getUserIdByEmail(email);
        
        log.info("Fetching dashboard stats for userId: {} (from token)", userId);
        
        try {
            DashboardResponse dashboardStats = answerService.getDashboardStats(userId);
            
            String message = dashboardStats.getQuestionsAnsweredCount() > 0 
                ? "Dashboard statistics retrieved successfully" 
                : "No answered questions found";
            
            ApiResponse<DashboardResponse> response = new ApiResponse<>(
                200, message, dashboardStats, Collections.emptyList());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Failed to fetch dashboard stats for userId: {}", userId, e);
            ApiResponse<DashboardResponse> response = new ApiResponse<>(
                500, "Failed to retrieve dashboard statistics", null,
                Collections.singletonList("An error occurred while fetching dashboard data"));
            return ResponseEntity.status(500).body(response);
        }
    }
} 