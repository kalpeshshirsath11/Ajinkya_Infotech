package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.model.Course;
import com.Ajinkya.Infotech.model.Enrollment;
import com.Ajinkya.Infotech.model.User;
import com.Ajinkya.Infotech.dto.AssignEnrollmentRequest;

import com.Ajinkya.Infotech.Enums.CompletionStatus;
import com.Ajinkya.Infotech.dto.EnrollmentResponse;
import com.Ajinkya.Infotech.repository.CourseRepository;
import com.Ajinkya.Infotech.repository.EnrollmentRepository;
import com.Ajinkya.Infotech.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepo userRepository;
    private final CourseRepository courseRepository;

    // ================= ASSIGN ENROLLMENT =================
    public EnrollmentResponse assignEnrollment(AssignEnrollmentRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        boolean isNill = Boolean.TRUE.equals(request.getIsNill());

        BigDecimal pendingFees = isNill
                ? BigDecimal.ZERO
                : request.getPendingFees() != null
                ? request.getPendingFees()
                : course.getPrice();

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .pendingFees(pendingFees)
                .isNill(isNill)
                .completionStatus(CompletionStatus.NOT_STARTED)
                .build();

        return mapToResponse(enrollmentRepository.save(enrollment));
    }

    // ================= GET MY ENROLLMENTS =================
    public List<EnrollmentResponse> getMyEnrollments() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return enrollmentRepository.findByUser(user)
                .stream()
                .map(enrollment -> mapToResponse((Enrollment) enrollment))

                .collect(Collectors.toList());
    }

    // ================= UPDATE FEES (ADMIN) =================
    public EnrollmentResponse updateFees(
            Long enrollmentId,
            BigDecimal pendingFees,
            Boolean isNill
    ) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        if (Boolean.TRUE.equals(isNill)) {
            enrollment.setIsNill(true);
            enrollment.setPendingFees(BigDecimal.ZERO);
        } else {
            if (pendingFees == null) {
                throw new RuntimeException("Pending fees required when isNill is false");
            }
            enrollment.setIsNill(false);
            enrollment.setPendingFees(pendingFees);
        }

        return mapToResponse(enrollmentRepository.save(enrollment));
    }

    // ================= UPDATE COMPLETION STATUS (ADMIN) =================
    public EnrollmentResponse updateCompletionStatus(
            Long enrollmentId,
            CompletionStatus status
    ) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setCompletionStatus(status);

        return mapToResponse(enrollmentRepository.save(enrollment));
    }

    // ================= MAPPER =================
    private EnrollmentResponse mapToResponse(Enrollment enrollment) {
        return EnrollmentResponse.builder()
                .enrollmentId(enrollment.getId())
                .userId(enrollment.getUser().getId())
                .userName(enrollment.getUser().getName())
                .userEmail(enrollment.getUser().getEmail())
                .courseId(enrollment.getCourse().getId())
                .courseName(enrollment.getCourse().getCourseName())
                .durationAndCommitment(
                        enrollment.getCourse().getDurationAndCommitment()
                )
                .pendingFees(enrollment.getPendingFees())
                .isNill(enrollment.getIsNill())
                .enrollmentStatus(enrollment.getStatus())
                .completionStatus(enrollment.getCompletionStatus())
                .enrolledAt(enrollment.getEnrolledAt())
                .build();
    }
}
