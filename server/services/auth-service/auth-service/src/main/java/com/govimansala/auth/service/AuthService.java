package com.govimansala.auth.service;

import com.govimansala.auth.dto.AuthRequest;
import com.govimansala.auth.dto.AuthResponse;
import com.govimansala.auth.dto.RegisterRequest;
import com.govimansala.auth.model.User;
import com.govimansala.auth.model.Role;
import com.govimansala.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request, String clientSource) {
        //Passowrd at least one number, upper case, lower case, special symbol with 8 characters
        if (!request.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
        }


        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Email already exists"
            );
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        if ("mobile".equalsIgnoreCase(clientSource)) {
            user.setRole(Role.FARMER);
        } else {
            user.setRole(request.getRole());
        }

        userRepository.save(user);
        String token = jwtService.generateToken(user.getUserId());
        return new AuthResponse(token, user.getRole().name(), user.getUserId());
    }

    public AuthResponse authenticate(AuthRequest request) {
        System.out.println("LOGIN email: " + request.getEmail());
        System.out.println("LOGIN password: " + request.getPassword());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        System.out.println("USER FOUND: " + user.getEmail());
        System.out.println("DB HASH: " + user.getPasswordHash());

        boolean match = passwordEncoder.matches(request.getPassword(), user.getPasswordHash());
        System.out.println("MATCH RESULT: " + match);

        if (!match) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getUserId());
        return new AuthResponse(token, user.getRole().name(), user.getUserId());
    }

}
