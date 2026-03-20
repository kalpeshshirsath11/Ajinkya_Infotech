package com.Ajinkya.Infotech.model;


import com.Ajinkya.Infotech.Enums.CompletionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Student
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Course
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // Enrollment time
    @Builder.Default
    private LocalDateTime enrolledAt = LocalDateTime.now();

    // Enrollment lifecycle
    @Builder.Default
    private String status = "ENROLLED";

    // 💰 Fees tracking
    @Column(name = "pending_fees", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal pendingFees = BigDecimal.ZERO;

    @Column(name = "is_nill")
    @Builder.Default
    private Boolean isNill = false;

    // Course completion tracking
    @Enumerated(EnumType.STRING)
    @Column(name = "completion_status", nullable = false)
    @Builder.Default
    private CompletionStatus completionStatus = CompletionStatus.NOT_STARTED;
}
