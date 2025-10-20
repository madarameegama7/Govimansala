package com.govimansala.auth.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "qa_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QaProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qaId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String certificationId;
    private String expertiseArea;
    private String region;
    private Integer yearsOfExperience;
    private Double rating = 0.0;
}
