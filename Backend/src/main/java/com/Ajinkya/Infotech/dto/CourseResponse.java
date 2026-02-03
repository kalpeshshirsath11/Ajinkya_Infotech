package com.Ajinkya.Infotech.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponse {

    private Long id;
    private String courseName;
    private String courseOverview;
    private String courseStructure;
    private String durationAndCommitment;
    private String whoThisCourseIsFor;
    private BigDecimal price;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
