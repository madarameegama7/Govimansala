package com.govimansala.auth.repository;

import com.govimansala.auth.model.VendorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VendorProfileRepository extends JpaRepository<VendorProfile, Long> {
    Optional<VendorProfile> findByUserUserId(Long userId);
}
