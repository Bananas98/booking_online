package com.ua.booking.online.demo.controllers;

import com.ua.booking.online.demo.repository.UserRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(value = "http://localhost:4200")
public class UserController {
    private UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/users")
    public String getAllUsers(Model model){
        model.addAttribute("users",repository.findAll());
        return "list-issues";
    }

    @GetMapping("/user/{id}")
    public String getAllUsers(Model model, @PathVariable String id){
        model.addAttribute("user",repository.findById(id));
        return "";
    }
}
