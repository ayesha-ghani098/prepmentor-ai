package com.prepmentor.backend.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.Base64;
import java.util.UUID;

/**
 * Utility class for uploading files to AWS S3 storage.
 */
@Component
public class S3Uploader {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.region}")
    private String region;

    public S3Uploader(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    /**
     * Uploads a base64-encoded file to S3 and returns the public URL.
     *
     * @param base64Data  the file data in base64 encoding
     * @param filename    the name of the file
     * @param contentType the MIME type of the file
     * @return the public URL of the uploaded file
     */
    public String uploadBase64File(String base64Data, String filename, String contentType) {
        byte[] fileBytes = Base64.getDecoder().decode(base64Data);
        String uniqueKey = "answers/" + UUID.randomUUID() + "_" + filename;

        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(uniqueKey)
                .contentType(contentType)
                .build();

        s3Client.putObject(putRequest, RequestBody.fromBytes(fileBytes));

        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, uniqueKey);
    }
}
