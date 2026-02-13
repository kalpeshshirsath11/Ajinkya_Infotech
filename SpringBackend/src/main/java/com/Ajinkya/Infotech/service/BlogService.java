package com.Ajinkya.Infotech.service;


import com.Ajinkya.Infotech.model.Blog;
import com.Ajinkya.Infotech.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    // ================= ADMIN =================

    public Blog createBlog(
            String title,
            String content,
            String image,
            boolean published
    ) throws IOException {

        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setSlug(generateSlug(title));
        blog.setContent(content);
        blog.setPublished(published);
        blog.setCoverImage(image);


        return blogRepository.save(blog);
    }

    public Blog updateBlog(
            Long id,
            String title,
            String content,
            String image,
            boolean published
    ) throws IOException {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        blog.setTitle(title);
        blog.setSlug(generateSlug(title));
        blog.setContent(content);
        blog.setPublished(published);
        if(image != null){
           blog.setCoverImage(image);
        }


        return blogRepository.save(blog);
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }

    // ================= PUBLIC =================

    public List<Blog> getPublishedBlogs() {
        return blogRepository.findByPublishedTrueOrderByCreatedAtDesc();
    }

    public Blog getBlogBySlug(String slug) {
        return (Blog) blogRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    // ================= UTIL =================

    private String generateSlug(String title) {
        return title
                .toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}

