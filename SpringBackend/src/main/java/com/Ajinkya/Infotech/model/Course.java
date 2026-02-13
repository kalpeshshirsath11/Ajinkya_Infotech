package com.Ajinkya.Infotech.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Course Name
    @Column(nullable = false, length = 150)
    private String courseName;

    // Course Overview / Summary
    @Column(columnDefinition = "TEXT")
    private String courseOverview;

    // Course Structure (modules, projects, format)
    @Column(columnDefinition = "TEXT")
    private String courseStructure;

    // Duration & Commitment
    @Column(length = 100)
    private String durationAndCommitment;

    // Target Audience
    @Column(columnDefinition = "TEXT")
    private String whoThisCourseIsFor;

    private BigDecimal price;

    private Boolean isActive = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "course")
    private List<Enrollment> enrollments;
}
