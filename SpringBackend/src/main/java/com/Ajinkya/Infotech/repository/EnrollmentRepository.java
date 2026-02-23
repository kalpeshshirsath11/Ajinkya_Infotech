package com.Ajinkya.Infotech.repository;

import com.Ajinkya.Infotech.model.Enrollment;
import com.Ajinkya.Infotech.model.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
    Collection<Object> findByUser(User user);

    boolean existsByUserIdAndCourseId(@NotNull(message = "User ID is required") Long userId, @NotNull(message = "Course ID is required") Long courseId);
}
