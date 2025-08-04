package com.prepmentor.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.Objects;

/**
 * Configuration class for asynchronous task execution using a thread pool.
 */
@EnableAsync
@Configuration
public class TaskExecutorConfig {

    @Autowired
    Environment env;

    /**
     * Provides a thread pool task executor bean configured from environment
     * properties.
     *
     * @return the configured TaskExecutor
     */
    @Bean(name = "taskExecutor")
    public TaskExecutor sduTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(Integer.parseInt(Objects.requireNonNull(env.getProperty("thread.pool.size"))));
        executor.setMaxPoolSize(Integer.parseInt(Objects.requireNonNull(env.getProperty("thread.max.pool.size"))));
        executor.setQueueCapacity(Integer.parseInt(Objects.requireNonNull(env.getProperty("queue.capacity"))));
        executor.setThreadNamePrefix("Executor-");
        executor.initialize();
        return executor;
    }
}
