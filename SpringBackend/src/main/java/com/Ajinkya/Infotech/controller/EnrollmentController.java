package com.Ajinkya.Infotech.controller;


import com.Ajinkya.Infotech.Enums.CompletionStatus;
import com.Ajinkya.Infotech.dto.AssignEnrollmentRequest;
import com.Ajinkya.Infotech.dto.EnrollmentResponse;
import com.Ajinkya.Infotech.dto.EnrollmentUpdateRequest;
import com.Ajinkya.Infotech.dto.UserResponse;
import com.Ajinkya.Infotech.model.User;
import com.Ajinkya.Infotech.service.EnrollmentService;
import com.Ajinkya.Infotech.service.UserSerrvice;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/admin/enrollments/")
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

    //  USER — Get own enrollments
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/me")
    public ResponseEntity<List<EnrollmentResponse>> getMyEnrollments() {
        return ResponseEntity.ok(enrollmentService.getMyEnrollments());
    }

    //  ADMIN — Update fees
    @PutMapping("/edit/{enrollmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EnrollmentResponse> updateEnrollment(
            @PathVariable Long enrollmentId,
            @RequestBody EnrollmentUpdateRequest request
    ) {
        return ResponseEntity.ok(
                enrollmentService.updateEnrollment(
                        enrollmentId,
                        request.getPendingFees(),
                        request.getIsNill(),
                        request.getStatus()
                )
        );
    }


    @GetMapping("/getUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAll(){
        return new ResponseEntity<>(enrollmentService.getAll(), HttpStatus.OK);
    }
    @GetMapping("/students/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> getStudent(
            @PathVariable Long id
    ){
        System.out.println("Running");
        return ResponseEntity.ok(
                enrollmentService.getStudentWithEnrollments(id)
        );
    }
}
