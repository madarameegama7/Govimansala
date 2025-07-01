package com.example.authservice.controller;

import com.example.authservice.model.User;
import com.example.authservice.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        return "User registered";
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {
        var user = userRepository.findByUsername(loginUser.getUsername()).orElse(null);
        if (user != null && passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            return "Login successful"; // Replace with JWT generation
        }
        return "Invalid credentials";
    }
}
