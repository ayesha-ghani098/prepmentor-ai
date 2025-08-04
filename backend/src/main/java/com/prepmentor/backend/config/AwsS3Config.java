package com.prepmentor.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

/**
 * Configuration class for AWS S3 client setup.
 */
@Configuration
public class AwsS3Config {

        @Value("${aws.accessKey}")
        private String accessKey;

        @Value("${aws.secretKey}")
        private String secretKey;

        @Value("${aws.region}")
        private String region;

        /**
         * Provides the AWS S3 client bean configured with credentials and region.
         *
         * @return the configured S3Client
         */
        @Bean
        public S3Client s3Client() {
                return S3Client.builder()
                                .region(Region.of(region))
                                .credentialsProvider(
                                                StaticCredentialsProvider.create(
                                                                AwsBasicCredentials.create(accessKey, secretKey)))
                                .build();
        }
}
