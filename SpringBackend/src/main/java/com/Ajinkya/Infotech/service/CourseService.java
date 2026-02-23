package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.dto.CourseRequest;
import com.Ajinkya.Infotech.dto.CourseResponse;
import com.Ajinkya.Infotech.dto.UpdateCourseRequest;
import com.Ajinkya.Infotech.model.Course;
import com.Ajinkya.Infotech.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {

    private final CourseRepository courseRepository;
    private final AIService aiService;

    // ================= CREATE =================

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

        Course savedCourse = courseRepository.save(course);

        // 🤖 Hook into AI (Same pattern as BlogService)
        if (Boolean.TRUE.equals(savedCourse.getIsActive())) {
            ingestCourseToAI(savedCourse);
        }

        return mapToResponse(savedCourse);
    }

    // ================= UPDATE =================

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

        Course savedCourse = courseRepository.save(course);

        // 🤖 Hook into AI
        if (Boolean.TRUE.equals(savedCourse.getIsActive())) {
            ingestCourseToAI(savedCourse);
        }

        return mapToResponse(savedCourse);
    }

    // ================= DELETE =================

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    // ================= PUBLIC =================

    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return mapToResponse(course);
    }

    // ================= AI INGEST =================

    private void ingestCourseToAI(Course course) {

        String fullContent =
                "Course Title: " + course.getCourseName() +
                "\n\nOverview:\n" + course.getCourseOverview() +
                "\n\nStructure:\n" + course.getCourseStructure() +
                "\n\nDuration:\n" + course.getDurationAndCommitment() +
                "\n\nWho This Course Is For:\n" + course.getWhoThisCourseIsFor() +
                "\n\nPrice: ₹" + course.getPrice();

        aiService.ingestContent(fullContent, "course-" + course.getId());

        log.info("Course {} ingested into AI", course.getId());
    }

    // ================= MAPPER =================

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