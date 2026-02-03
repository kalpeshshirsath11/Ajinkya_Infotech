package com.Ajinkya.Infotech.repository;

import com.Ajinkya.Infotech.model.Enrollment;
import com.Ajinkya.Infotech.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
    Collection<Object> findByUser(User user);
}
