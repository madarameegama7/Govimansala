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
    private final QaProfileRepository qaRepo;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // ---------------- REGISTER ----------------
    @Transactional
    public AuthResponse register(RegisterRequest request, String clientSource) {
        // Password policy
        if (!request.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
        }

        // Duplicate email check
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        // Create base user
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

        // Create role-specific profile
        switch (user.getRole()) {
            case FARMER -> {
                FarmerProfile profile = new FarmerProfile();
                profile.setUser(user);
                profile.setFarmSize(request.getFarmSize());
                profile.setFarmType(request.getFarmType());
                profile.setLocation(request.getLocation());
                profile.setCredits(0);
                farmerRepo.save(profile);
            }
            case VENDOR -> {
                VendorProfile profile = new VendorProfile();
                profile.setUser(user);
                profile.setCompanyName(request.getCompanyName());
                profile.setLicenseNo(request.getLicenseNo());
                profile.setLocation(request.getLocation());
                vendorRepo.save(profile);
            }
            case BUYER -> {
                BuyerProfile profile = new BuyerProfile();
                profile.setUser(user);
                profile.setBusinessName(request.getBusinessName());
                profile.setDeliveryAddress(request.getDeliveryAddress());
                buyerRepo.save(profile);
            }
            case DRIVER -> {
                DriverProfile profile = new DriverProfile();
                profile.setUser(user);
                profile.setLicenseNumber(request.getLicenseNumber());
                profile.setVehicleNo(request.getVehicleNo());
                profile.setAvailable(true);
                profile.setCurrentLocation(request.getCurrentLocation());
                driverRepo.save(profile);
            }
            case QA -> {
                QaProfile profile = new QaProfile();
                profile.setUser(user);
                profile.setCertificationId(request.getCertificationId());
                profile.setExpertiseArea(request.getExpertiseArea());
                profile.setRegion(request.getRegion());
                profile.setYearsOfExperience(request.getYearsOfExperience());
                profile.setRating(0.0);
                qaRepo.save(profile);
            }
            case ADMIN -> {
                // Admin doesn't need a profile table
            }
        }

        // Generate JWT
        String token = jwtService.generateToken(user.getUserId());
        return new AuthResponse(token, user.getRole().name(), user.getUserId());
    }

    // ---------------- AUTHENTICATE ----------------
    public AuthResponse authenticate(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        boolean match = passwordEncoder.matches(request.getPassword(), user.getPasswordHash());
        if (!match) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getUserId());
        return new AuthResponse(token, user.getRole().name(), user.getUserId());
    }

    // ---------------- FETCH ALL PROFILES ----------------
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllUserProfiles() {
        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {
            Map<String, Object> profileData = new HashMap<>();
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
                case QA -> qaRepo.findByUser_UserId(user.getUserId()).ifPresent(p -> {
                    profileData.put("certification_id", p.getCertificationId());
                    profileData.put("expertise_area", p.getExpertiseArea());
                    profileData.put("region", p.getRegion());
                    profileData.put("years_of_experience", p.getYearsOfExperience());
                    profileData.put("rating", p.getRating());
                });
                default -> {}
            }

            return profileData;
        }).collect(Collectors.toList());
    }
    @Transactional
    public Map<String, Object> updateUserProfile(String token, UserProfileUpdateRequest request)
    {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid token");
        }

        Long userId = jwtService.extractUserId(token.substring(7));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // --- Update base user info ---
        if (request.getName() != null) user.setName(request.getName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAddress() != null) user.setAddress(request.getAddress());
        userRepository.save(user);

        // --- Update role-specific profile ---
        switch (user.getRole()) {
            case FARMER -> farmerRepo.findByUserUserId(user.getUserId()).ifPresent(p -> {
                if (request.getFarmSize() != null) p.setFarmSize(request.getFarmSize());
                if (request.getFarmType() != null) p.setFarmType(request.getFarmType());
                if (request.getLocation() != null) p.setLocation(request.getLocation());

                // ✅ Convert if credits is sent as Double (or String)
                if (request.getCredits() != null) {
                    p.setCredits(request.getCredits().intValue()); // safe conversion
                }

                farmerRepo.save(p);
            });


            case VENDOR -> vendorRepo.findByUserUserId(user.getUserId()).ifPresent(p -> {
                if (request.getCompanyName() != null) p.setCompanyName(request.getCompanyName());
                if (request.getLicenseNo() != null) p.setLicenseNo(request.getLicenseNo());
                if (request.getLocation() != null) p.setLocation(request.getLocation());
                vendorRepo.save(p);
            });

            case BUYER -> buyerRepo.findByUserUserId(user.getUserId()).ifPresent(p -> {
                if (request.getBusinessName() != null) p.setBusinessName(request.getBusinessName());
                if (request.getDeliveryAddress() != null) p.setDeliveryAddress(request.getDeliveryAddress());
                buyerRepo.save(p);
            });

            case DRIVER -> driverRepo.findByUserUserId(user.getUserId()).ifPresent(p -> {
                if (request.getLicenseNumber() != null) p.setLicenseNumber(request.getLicenseNumber());
                if (request.getVehicleNo() != null) p.setVehicleNo(request.getVehicleNo());
                if (request.getAvailable() != null) p.setAvailable(request.getAvailable());
                if (request.getCurrentLocation() != null) p.setCurrentLocation(request.getCurrentLocation());
                driverRepo.save(p);
            });

            case QA -> qaRepo.findByUser_UserId(user.getUserId()).ifPresent(p -> {
                if (request.getCertificationId() != null) p.setCertificationId(request.getCertificationId());
                if (request.getExpertiseArea() != null) p.setExpertiseArea(request.getExpertiseArea());
                if (request.getRegion() != null) p.setRegion(request.getRegion());
                if (request.getYearsOfExperience() != null) p.setYearsOfExperience(request.getYearsOfExperience());

                // ✅ Only if you have rating updates — convert from String to Double
                if (request.getRating() != null) {
                    try {
                        p.setRating(Double.parseDouble(request.getRating().toString()));
                    } catch (NumberFormatException e) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid rating value");
                    }
                }

                qaRepo.save(p);
            });


            default -> {}
        }

        // Return updated profile as confirmation
        Map<String, Object> updatedProfile = new HashMap<>();
        updatedProfile.put("userId", user.getUserId());
        updatedProfile.put("name", user.getName());
        updatedProfile.put("email", user.getEmail());
        updatedProfile.put("role", user.getRole().name());
        updatedProfile.put("phone", user.getPhone());
        updatedProfile.put("address", user.getAddress());

        return updatedProfile;
    }

}
