package com.govimansala.auth.repository;

import com.govimansala.auth.model.QaProfile;
import com.govimansala.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QaProfileRepository extends JpaRepository<QaProfile, Long> {
    Optional<QaProfile> findByUser(User user);
    Optional<QaProfile> findByUser_UserId(Long userId);
}
