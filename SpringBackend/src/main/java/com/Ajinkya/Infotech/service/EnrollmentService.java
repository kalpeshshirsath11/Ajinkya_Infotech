package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.dto.StudentEnrollmentDTO;
import com.Ajinkya.Infotech.dto.UserResponse;
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

        //  CHECK: already enrolled?
        boolean alreadyEnrolled = enrollmentRepository
                .existsByUserIdAndCourseId(request.getUserId(), request.getCourseId());

        if (alreadyEnrolled) {
            throw new RuntimeException("Student already enrolled in this course");
        }

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
    public List<UserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .mobileNumber(user.getMobileNumber())

                        .isActive(user.getIsActive())
                        .build()
                ).toList();
    }
    public UserResponse getStudentWithEnrollments(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<StudentEnrollmentDTO> enrollmentDTOs =
                user.getEnrollments().stream()
                        .map(e -> StudentEnrollmentDTO.builder()
                                .enrollmentId(e.getId())
                                .courseId(e.getCourse().getId())
                                .courseName(e.getCourse().getCourseName())
                                .pendingFees(e.getPendingFees())
                                .isNill(e.getIsNill())
                                .status(e.getCompletionStatus())
                                .build()
                        ).toList();

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .mobileNumber(user.getMobileNumber())
                .isActive(user.getIsActive())
                .enrollments(enrollmentDTOs)
                .build();
    }


    public EnrollmentResponse updateEnrollment(
            Long enrollmentId,
            BigDecimal pendingFees,
            Boolean isNill,
            CompletionStatus status
    ) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        if (pendingFees != null) {
            enrollment.setPendingFees(pendingFees);
        }

        if (isNill != null) {
            enrollment.setIsNill(isNill);
        }

        if (status != null) {
            enrollment.setStatus(String.valueOf(status));
        }

        enrollmentRepository.save(enrollment);

        return mapToResponse(enrollment);
    }

}
