package com.govimansala.auth.service;


import com.govimansala.auth.dto.*;
import com.govimansala.auth.model.*;
import com.govimansala.auth.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;
import java.util.*;
import org.springframework.security.access.prepost.PreAuthorize;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final FarmerProfileRepository farmerRepo;
    private final VendorProfileRepository vendorRepo;
    private final BuyerProfileRepository buyerRepo;
    private final DriverProfileRepository driverRepo;
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

    @Transactional(readOnly = true)
    public List<Map<String,Object>> getAllUserProfiles(){
        List<User> users = userRepository.findAll();

        return users.stream().map(user->{
            Map<String,Object> profileData=new HashMap<>();
            profileData.put("user_id", user.getUserId());
            profileData.put("name", user.getName());
            profileData.put("email", user.getEmail());
            profileData.put("role", user.getRole().name());
            profileData.put("phone", user.getPhone());
            profileData.put("address", user.getAddress());
            profileData.put("is_verified", user.isVerified());
            profileData.put("created_at", user.getCreatedAt());

            switch (user.getRole()) {
                case FARMER -> farmerRepo.findByUserUserId(user.getUserId()).ifPresent(p -> {
                    profileData.put("farm_size", p.getFarmSize());
                    profileData.put("farm_type", p.getFarmType());
                    profileData.put("location", p.getLocation());
                    profileData.put("credits", p.getCredits());
                });
                case VENDOR -> vendorRepo.findByUserUserId(user.getUserId()).ifPresent(p -> {
                    profileData.put("company_name", p.getCompanyName());
                    profileData.put("license_no", p.getLicenseNo());
                    profileData.put("location", p.getLocation());
                });
                case DRIVER -> driverRepo.findByUserUserId(user.getUserId()).ifPresent(p -> {
                    profileData.put("license_number", p.getLicenseNumber());
                    profileData.put("vehicle_no", p.getVehicleNo());
                    profileData.put("is_available", p.isAvailable());
                    profileData.put("current_location", p.getCurrentLocation());
                });
                case BUYER -> buyerRepo.findByUserUserId(user.getUserId()).ifPresent(p -> {
                    profileData.put("business_name", p.getBusinessName());
                    profileData.put("delivery_address", p.getDeliveryAddress());
                });
                default -> {}
            }

            return profileData;
        }).collect(Collectors.toList());
    }

}
