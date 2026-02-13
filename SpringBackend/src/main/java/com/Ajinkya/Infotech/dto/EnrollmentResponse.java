package com.Ajinkya.Infotech.dto;


import com.Ajinkya.Infotech.Enums.CompletionStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentResponse {

    private Long enrollmentId;

    // User details
    private Long userId;
    private String userName;
    private String userEmail;

    // Course details
    private Long courseId;
    private String courseName;
    private String durationAndCommitment;

    // Fees info
    private BigDecimal pendingFees;
    private Boolean isNill;

    // Status info
    private String enrollmentStatus; // ENROLLED / CANCELLED
    private CompletionStatus completionStatus; // NOT_STARTED / IN_PROGRESS / COMPLETED

    // Timestamp
    private LocalDateTime enrolledAt;
}