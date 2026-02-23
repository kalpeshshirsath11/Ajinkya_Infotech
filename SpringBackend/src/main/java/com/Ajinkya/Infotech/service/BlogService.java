package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.model.Blog;
import com.Ajinkya.Infotech.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BlogService {

    private final BlogRepository blogRepository;
    private final AIService aiService;

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

        Blog savedBlog = blogRepository.save(blog);

        // 🤖 Hook into AI
        if (published) {
            String fullContent = "Blog Title: " + savedBlog.getTitle()
                    + "\n\n"
                    + savedBlog.getContent();

            aiService.ingestContent(fullContent, "blog-" + savedBlog.getId());
        }

        return savedBlog;
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

        if (image != null) {
            blog.setCoverImage(image);
        }

        Blog savedBlog = blogRepository.save(blog);

        // 🤖 Hook into AI
        if (published) {
            String fullContent = "Blog Title: " + savedBlog.getTitle()
                    + "\n\n"
                    + savedBlog.getContent();

            aiService.ingestContent(fullContent, "blog-" + savedBlog.getId());
        }

        return savedBlog;
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }

    // ================= PUBLIC =================

    public List<Blog> getPublishedBlogs() {
        return blogRepository.findByPublishedTrueOrderByCreatedAtDesc();
    }

    public Blog getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug)
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
