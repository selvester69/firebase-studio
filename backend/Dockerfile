# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-alpine as builder

# Set the working directory for the builder stage
WORKDIR /app

# Copy the Gradle build files
COPY gradlew .
COPY gradle gradle/
COPY build.gradle .
COPY settings.gradle .

# Copy the source code
COPY src src

# Grant execute permission for the Gradle wrapper
RUN chmod +x gradlew

# Build the application
RUN ./gradlew bootJar

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine

# Set the working directory for the runner stage
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose the port your Spring Boot application runs on
EXPOSE 8080

# Command to run the Spring Boot application
ENTRYPOINT ["java","-jar","/app/app.jar"]