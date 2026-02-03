package com.Ajinkya.Infotech.controller;


import com.Ajinkya.Infotech.dto.AssignEnrollmentRequest;
import com.Ajinkya.Infotech.Enums.CompletionStatus;
import com.Ajinkya.Infotech.dto.EnrollmentResponse;
import com.Ajinkya.Infotech.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    // ' ADMIN — Assign enrollment to student
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/assign")
    public ResponseEntity<EnrollmentResponse> assignEnrollment(
            @Valid @RequestBody AssignEnrollmentRequest request
    ) {
        return ResponseEntity.ok(enrollmentService.assignEnrollment(request));
    }

    // 👤 USER — Get own enrollments
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/me")
    public ResponseEntity<List<EnrollmentResponse>> getMyEnrollments() {
        return ResponseEntity.ok(enrollmentService.getMyEnrollments());
    }

    //  ADMIN — Update fees
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{enrollmentId}/fees")
    public ResponseEntity<EnrollmentResponse> updateFees(
            @PathVariable Long enrollmentId,
            @RequestParam(required = false) BigDecimal pendingFees,
            @RequestParam(required = false) Boolean isNill
    ) {
        return ResponseEntity.ok(
                enrollmentService.updateFees(enrollmentId, pendingFees, isNill)
        );
    }

    //  ADMIN — Update completion status
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{enrollmentId}/completion")
    public ResponseEntity<EnrollmentResponse> updateCompletionStatus(
            @PathVariable Long enrollmentId,
            @RequestParam CompletionStatus status
    ) {
        return ResponseEntity.ok(
                enrollmentService.updateCompletionStatus(enrollmentId, status)
        );
    }
}
