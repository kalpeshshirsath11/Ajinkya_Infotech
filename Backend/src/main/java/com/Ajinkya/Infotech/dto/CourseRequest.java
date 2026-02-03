package com.Ajinkya.Infotech.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {

    @NotBlank(message = "Course name is required")
    @Size(max = 150, message = "Course name must not exceed 150 characters")
    private String courseName;

    @NotBlank(message = "Course overview is required")
    private String courseOverview;

    @NotBlank(message = "Course structure is required")
    private String courseStructure;

    @NotBlank(message = "Duration & commitment is required")
    private String durationAndCommitment;

    @NotBlank(message = "Target audience is required")
    private String whoThisCourseIsFor;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    private Boolean isActive;
}
