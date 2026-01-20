package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.model.Blog;
import com.Ajinkya.Infotech.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    // ================= PUBLIC =================

    @GetMapping
    public List<Blog> getAllPublishedBlogs() {
        return blogService.getPublishedBlogs();
    }

    @GetMapping("/{slug}")
    public Blog getBlogBySlug(@PathVariable String slug) {
        return blogService.getBlogBySlug(slug);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getBlogImage(@PathVariable Long id) {

        Blog blog = blogService.getBlogById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(blog.getImageType()))
                .body(blog.getCoverImage());
    }

    // ================= ADMIN =================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(
            value = "/admin",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Blog createBlog(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(defaultValue = "true") boolean published
    ) throws IOException {

        return blogService.createBlog(title, content, image, published);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(
            value = "/admin/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Blog updateBlog(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(defaultValue = "true") boolean published
    ) throws IOException {

        return blogService.updateBlog(id, title, content, image, published);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok("Blog deleted successfully");
    }
}
