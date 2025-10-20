package com.govimansala.auth.repository;

import com.govimansala.auth.model.BuyerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BuyerProfileRepository extends JpaRepository<BuyerProfile, Long> {
    Optional<BuyerProfile> findByUserUserId(Long userId);
}
