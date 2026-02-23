package com.Ajinkya.Infotech.dto;

import com.Ajinkya.Infotech.Enums.CompletionStatus;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentEnrollmentDTO {

    private Long enrollmentId;
    private Long courseId;
    private String courseName;
    private BigDecimal pendingFees;
    private Boolean isNill;
    private CompletionStatus status;
}
