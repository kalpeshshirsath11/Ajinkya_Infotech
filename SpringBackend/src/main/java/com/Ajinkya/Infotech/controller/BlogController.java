package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.model.Blog;
import com.Ajinkya.Infotech.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    //private CloudinaryService cloudinaryService;
    // ================= PUBLIC =================

    @GetMapping
    public List<Blog> getAllPublishedBlogs() {
        return blogService.getPublishedBlogs();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Blog> getBlogBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.getBlogBySlug(slug));
    }


//    @GetMapping("/{id}/image")
//    public ResponseEntity<byte[]> getBlogImage(@PathVariable Long id) {
//
//        Blog blog = blogService.getBlogById(id);
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(blog.getImageType()))
//                .body(blog.getCoverImage());
//    }

    // ================= ADMIN =================





}
