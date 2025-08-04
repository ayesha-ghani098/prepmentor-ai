package com.prepmentor.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for OpenAI API integration.
 */
@Configuration
public class OpenAIConfig {
    @Value("${openai.api.key}")
    private String apiKey;

    /**
     * Returns the OpenAI API key from configuration.
     *
     * @return the OpenAI API key
     */
    public String getApiKey() {
        return apiKey;
    }
}
