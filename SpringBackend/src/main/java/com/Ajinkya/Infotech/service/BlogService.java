package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.Enums.RoleEnum;
import com.Ajinkya.Infotech.model.Blog;
import com.Ajinkya.Infotech.model.User;
import com.Ajinkya.Infotech.repository.BlogRepository;
import com.Ajinkya.Infotech.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BlogService {

    private final BlogRepository blogRepository;
    private final AIService aiService;
    private final CloudinaryService cloudinaryService;
    private final UserRepo userRepo;

    public Blog createBlog(
            String title,
            String content,
            MultipartFile image,
            boolean published,
            String email
    ) throws IOException {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == RoleEnum.STUDENT) {
            throw new RuntimeException("Only ADMIN or TEACHER can create blogs");
        }

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = cloudinaryService.uploadImage(image);
        }

        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setSlug(generateSlug(title));
        blog.setContent(content);
        blog.setPublished(published);
        blog.setCoverImage(imageUrl);
        blog.setOwner(user);

        Blog savedBlog = blogRepository.save(blog);

        if (published) {
            String fullContent = "Blog Title: " + savedBlog.getTitle()
                    + "\n\n"
                    + savedBlog.getContent();

            aiService.ingestContent(fullContent, "blog-" + savedBlog.getId());
        }

        return savedBlog;
    }
    public Blog updateBlogByOwner(
            Long id,
            String title,
            String content,
            MultipartFile image,
            boolean published,
            String email
    ) throws IOException {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // OWNER CHECK
        if (!blog.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        blog.setTitle(title);
        blog.setSlug(generateSlug(title));
        blog.setContent(content);
        blog.setPublished(published);

        if (image != null && !image.isEmpty()) {
            String url = cloudinaryService.uploadImage(image);
            blog.setCoverImage(url);
        }

        return blogRepository.save(blog);
    }



    public void deleteBlogByOwner(Long id, String email) {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        //  OWNER CHECK
        if (!blog.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        blogRepository.delete(blog);
    }

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

    private String generateSlug(String title) {
        return title
                .toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
    public List<Blog> getBlogsByUser(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return blogRepository.findByOwnerId(user.getId());
    }
}