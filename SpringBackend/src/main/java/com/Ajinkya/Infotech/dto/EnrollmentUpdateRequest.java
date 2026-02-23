package com.Ajinkya.Infotech.dto;

import com.Ajinkya.Infotech.Enums.CompletionStatus;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class EnrollmentUpdateRequest {

    private BigDecimal pendingFees;

    private Boolean isNill;

    private CompletionStatus status;
}