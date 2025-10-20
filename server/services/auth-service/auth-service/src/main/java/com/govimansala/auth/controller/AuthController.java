package com.govimansala.auth.controller;

import com.govimansala.auth.dto.*;
import org.springframework.http.HttpHeaders;
import com.govimansala.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")

    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request,
            @RequestHeader(value = "X-Client-Source", required = false) String clientSource) {

        if (clientSource == null) {
            clientSource = "web";
        }

        AuthResponse response = authService.register(request, clientSource);
        return ResponseEntity.ok(response);

    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {

        return authService.authenticate(request);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(authService.getAllUserProfiles());
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody UserProfileUpdateRequest request) {
        Map<String, Object> updatedProfile = authService.updateUserProfile(token, request);
        return ResponseEntity.ok(updatedProfile);
    }



}
