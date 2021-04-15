package com.ua.booking.online.demo.repository;

import com.ua.booking.online.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByName(String name);
    Boolean existsByName(String name);
    Boolean existsByEmail(String email);


}
