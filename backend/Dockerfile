# Use JDK 17 base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Gradle wrapper & build files first to leverage Docker cache
COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle .
COPY settings.gradle .

# Download Gradle dependencies
RUN ./gradlew dependencies || return 0

# Copy the rest of the source code
COPY . .

# Build the project (skip tests to save time)
RUN ./gradlew build -x test

# Run the application
CMD ["java", "-jar", "build/libs/backend-1.0.0.jar"]
