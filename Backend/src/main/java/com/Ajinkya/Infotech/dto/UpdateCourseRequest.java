package com.Ajinkya.Infotech.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCourseRequest {

    private String courseName;
    private String courseOverview;
    private String courseStructure;
    private String durationAndCommitment;
    private String whoThisCourseIsFor;
    private BigDecimal price;
    private Boolean isActive;
}
