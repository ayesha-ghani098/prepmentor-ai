package com.prepmentor.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prepmentor.backend.config.OpenAIConfig;
import com.prepmentor.backend.dto.QuestionSetRequest;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for interacting with the OpenAI API to generate interview questions
 * and feedback.
 * Handles prompt construction and API communication.
 */
@Service
public class OpenAIService {
    private final OkHttpClient client = new OkHttpClient();
    private final OpenAIConfig openAIConfig;
    private final ObjectMapper mapper = new ObjectMapper();

    public OpenAIService(OpenAIConfig openAIConfig) {
        this.openAIConfig = openAIConfig;
    }

    /**
     * Generates a list of interview questions using OpenAI based on the provided
     * request.
     *
     * @param req the question set request containing generation parameters
     * @return a list of generated questions as strings
     * @throws IOException if the OpenAI API call fails
     */
    public List<String> generateQuestions(QuestionSetRequest req) throws IOException {
        MediaType JSON = MediaType.get("application/json; charset=utf-8");

        String prompt = String.format(
                "Generate %d %s %s interview questions",
                req.getQuantity(),
                req.getDifficulty(),
                req.getType());

        String bodyJson = """
                {
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        {"role":"system","content":"You are an expert AI that generates interview questions."},
                        {"role":"system","content":"Most questions should be 1–2 lines. If necessary (e.g., for coding tasks), you may use up to 4 lines."},
                        {"role":"user","content":"%s"}
                    ],
                    "max_tokens": 500
                }
                """
                .formatted(prompt);

        RequestBody body = RequestBody.create(bodyJson, JSON);
        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .header("Authorization", "Bearer " + openAIConfig.getApiKey())
                .header("Content-Type", "application/json")
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.body() == null) {
                throw new IOException("OpenAI API response body is null.");
            }

            String json = response.body().string();
            JsonNode root = mapper.readTree(json);

            // If OpenAI returns an error, it usually contains an 'error' object
            if (root.has("error")) {
                String errorMessage = root.get("error").get("message").asText();
                throw new IOException("OpenAI API error: " + errorMessage);
            }

            JsonNode choicesNode = root.path("choices");
            if (!choicesNode.isArray() || choicesNode.isEmpty()) {
                throw new IOException("No choices found in OpenAI response.");
            }

            String content = choicesNode.get(0)
                    .path("message")
                    .path("content")
                    .asText("");

            if (content.isEmpty()) {
                throw new IOException("Content in OpenAI response is empty.");
            }

            return List.of(content.split("\\n"))
                    .stream()
                    .filter(line -> line.matches("^\\d+\\.\\s.*"))
                    .map(line -> line.replaceFirst("^\\d+\\.\\s*", ""))
                    .collect(Collectors.toList());
        }
    }

    /**
     * Generates feedback for a given answer in the context of a question using
     * OpenAI.
     *
     * @param questionText the text of the question
     * @param answerText   the text of the answer
     * @return feedback as a string
     * @throws IOException if the OpenAI API call fails
     */
    public String generateFeedback(String questionText, String answerText) throws IOException {
        MediaType JSON = MediaType.get("application/json; charset=utf-8");
        String prompt = "Question: " + questionText + "Answer: " + answerText;

        String bodyJson = """
                {
                  "model": "gpt-3.5-turbo",
                  "messages": [
                    {
                      "role": "system",
                      "content": "You are an expert AI interviewer. When given a question and answer, evaluate it and return a structured response in this exact format: Score (overall, out of 5): <number> Correctness (0–5): <number> Completeness (0–5): <number> Clarity (0–5): <number> Feedback: <Concise feedback in 2–3 sentences, highlighting strengths and one area for improvement.> If the answer is irrelevant or incorrect, still provide the structure with appropriate scores (e.g., 0) and explain why in feedback."
                    },
                    {
                      "role": "user",
                      "content": "%s"
                    }
                  ],
                  "max_tokens": 500
                }
                """.formatted(prompt);


        RequestBody body = RequestBody.create(bodyJson, JSON);
        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .header("Authorization", "Bearer " + openAIConfig.getApiKey())
                .header("Content-Type", "application/json")
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (response.body() == null) {
                throw new IOException("OpenAI API response body is null.");
            }
            String json = response.body().string();
            JsonNode root = mapper.readTree(json);
            if (root.has("error")) {
                String errorMessage = root.get("error").get("message").asText();
                throw new IOException("OpenAI API error: " + errorMessage);
            }
            JsonNode choicesNode = root.path("choices");
            if (!choicesNode.isArray() || choicesNode.isEmpty()) {
                throw new IOException("No choices found in OpenAI response.");
            }
            String content = choicesNode.get(0)
                    .path("message")
                    .path("content")
                    .asText("");
            if (content.isEmpty()) {
                throw new IOException("Content in OpenAI response is empty.");
            }
            return content.trim();
        }
    }
}
