package com.Ajinkya.Infotech.service;


import com.Ajinkya.Infotech.model.Course;
import com.Ajinkya.Infotech.dto.CourseRequest;
import com.Ajinkya.Infotech.dto.CourseResponse;
import com.Ajinkya.Infotech.dto.UpdateCourseRequest;
import com.Ajinkya.Infotech.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    // CREATE
    public CourseResponse addCourse(CourseRequest request) {
        Course course = Course.builder()
                .courseName(request.getCourseName())
                .courseOverview(request.getCourseOverview())
                .courseStructure(request.getCourseStructure())
                .durationAndCommitment(request.getDurationAndCommitment())
                .whoThisCourseIsFor(request.getWhoThisCourseIsFor())
                .price(request.getPrice())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();

        return mapToResponse(courseRepository.save(course));
    }

    // UPDATE
    public CourseResponse updateCourse(Long id, UpdateCourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (request.getCourseName() != null)
            course.setCourseName(request.getCourseName());

        if (request.getCourseOverview() != null)
            course.setCourseOverview(request.getCourseOverview());

        if (request.getCourseStructure() != null)
            course.setCourseStructure(request.getCourseStructure());

        if (request.getDurationAndCommitment() != null)
            course.setDurationAndCommitment(request.getDurationAndCommitment());

        if (request.getWhoThisCourseIsFor() != null)
            course.setWhoThisCourseIsFor(request.getWhoThisCourseIsFor());

        if (request.getPrice() != null)
            course.setPrice(request.getPrice());

        if (request.getIsActive() != null)
            course.setIsActive(request.getIsActive());

        return mapToResponse(courseRepository.save(course));
    }


    // READ ALL
    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // READ BY ID
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return mapToResponse(course);
    }

    // MAPPER
    private CourseResponse mapToResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .courseName(course.getCourseName())
                .courseOverview(course.getCourseOverview())
                .courseStructure(course.getCourseStructure())
                .durationAndCommitment(course.getDurationAndCommitment())
                .whoThisCourseIsFor(course.getWhoThisCourseIsFor())
                .price(course.getPrice())
                .isActive(course.getIsActive())
                .createdAt(course.getCreatedAt())
                .build();
    }
}