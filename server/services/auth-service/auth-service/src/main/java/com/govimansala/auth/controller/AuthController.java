package com.govimansala.auth.controller;

import com.govimansala.auth.dto.AuthRequest;
import com.govimansala.auth.dto.AuthResponse;
import com.govimansala.auth.dto.RegisterRequest;
import com.govimansala.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {

        return authService.authenticate(request);
    }
}
