package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.dto.CourseRequest;
import com.Ajinkya.Infotech.dto.CourseResponse;
import com.Ajinkya.Infotech.dto.UpdateCourseRequest;
import com.Ajinkya.Infotech.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminCourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseResponse> addCourse(
            @Valid @RequestBody CourseRequest request
    ) {
        return ResponseEntity.ok(courseService.addCourse(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCourseRequest request
    ) {
        return ResponseEntity.ok(courseService.updateCourse(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id){
        courseService.deleteCourse(id);
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses(){
        return ResponseEntity.ok(courseService.getAllCourses());
    }
}
