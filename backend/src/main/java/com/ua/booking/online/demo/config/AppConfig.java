package com.ua.booking.online.demo.config;

import com.mongodb.client.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.net.UnknownHostException;

@Configuration
@EnableMongoRepositories
public class AppConfig {
    @Bean
    public MongoClient mongoClient () throws UnknownHostException {
        //return new MongoClient();
    }

    @Bean
    public MongoTemplate mongoTemplate() throws  UnknownHostException{
        return new MongoTemplate(mongoClient(),"hotel_online");
    }
}
