package com.prepmentor.backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Entry point for the PrepMentor AI Backend application.
 * This application provides REST APIs for user authentication, question
 * management, answer submission, and more.
 */
@Slf4j
@EnableAsync
@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {

		SpringApplication.run(BackendApplication.class, args);
		log.info("PrepMentor AI Backend started successfully");
	}
}
