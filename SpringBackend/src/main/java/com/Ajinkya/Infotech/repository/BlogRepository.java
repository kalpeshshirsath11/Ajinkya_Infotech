package com.Ajinkya.Infotech.repository;

import com.Ajinkya.Infotech.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    // ================= PUBLIC =================

    // Get only published blogs (latest first)
    List<Blog> findByPublishedTrueOrderByCreatedAtDesc();

    // Get blog by SEO slug
    Optional<Blog> findBySlug(String slug);

    // ================= ADMIN =================

    // Check slug uniqueness (useful later)
    boolean existsBySlug(String slug);

    // Get all blogs (admin dashboard)
    List<Blog> findAllByOrderByCreatedAtDesc();
}