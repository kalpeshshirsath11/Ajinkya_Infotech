package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.model.Blog;
import com.Ajinkya.Infotech.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public List<Blog> getAllPublishedBlogs() {
        return blogService.getPublishedBlogs();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Blog> getBlogBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.getBlogBySlug(slug));
    }

    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> createBlog(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam boolean published,
            @RequestPart(required = false) MultipartFile image,
            Authentication authentication
    ) throws IOException {

        String email = authentication.getName();

        return ResponseEntity.ok(
                blogService.createBlog(title, content, image, published, email)
        );
    }



    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> updateBlog(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam boolean published,
            @RequestPart(required = false) MultipartFile image,
            Authentication authentication
    ) throws IOException {

        String email = authentication.getName();

        return ResponseEntity.ok(
                blogService.updateBlogByOwner(id, title, content, image, published, email)
        );
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> deleteBlog(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        blogService.deleteBlogByOwner(id, email);

        return ResponseEntity.ok("Deleted");
    }
    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<Blog>> getMyBlogs(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(blogService.getBlogsByUser(email));
    }
}