package com.govimansala.auth.repository;

import com.govimansala.auth.model.DriverProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DriverProfileRepository extends JpaRepository<DriverProfile, Long> {
    Optional<DriverProfile> findByUserUserId(Long userId);
}
