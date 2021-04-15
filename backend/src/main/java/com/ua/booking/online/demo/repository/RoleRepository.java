package com.ua.booking.online.demo.repository;

import com.ua.booking.online.demo.enums.Roles;
import com.ua.booking.online.demo.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(Roles name);
}
