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

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String duration;

    private BigDecimal price;

    private Boolean isActive = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "course")
    private List<Enrollment> enrollments;
}
