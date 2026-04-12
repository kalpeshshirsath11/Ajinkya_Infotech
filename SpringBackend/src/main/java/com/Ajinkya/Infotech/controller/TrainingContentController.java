package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.model.TrainingContent;
import com.Ajinkya.Infotech.service.CloudinaryService;
import com.Ajinkya.Infotech.service.TrainingContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/achievements")
public class TrainingContentController {

    @Autowired
    private TrainingContentService service;

    @Autowired
    private CloudinaryService cloudinaryService;

    // ✅ ADD
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public TrainingContent addAchievement(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam String titleM,
            @RequestParam String contentM,
            @RequestParam MultipartFile image
    ) throws IOException {

        String imageUrl = cloudinaryService.uploadImage(image);

        TrainingContent tc = new TrainingContent();
        tc.setTitle(title);
        tc.setContent(content);
        tc.setTitleM(titleM);
        tc.setContentM(contentM);
        tc.setImage(imageUrl);

        return service.addAchievement(tc);
    }

    // ✅ GET
    @GetMapping
    public List<TrainingContent> getAllAchievements() {
        return service.getAllAchievements();
    }

    // ✅ UPDATE
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public TrainingContent updateAchievement(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam String titleM,
            @RequestParam String contentM,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {

        TrainingContent existing = service.getById(id);

        existing.setTitle(title);
        existing.setContent(content);
        existing.setTitleM(titleM);
        existing.setContentM(contentM);

        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            existing.setImage(imageUrl);
        }

        return service.addAchievement(existing);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteAchievement(@PathVariable Long id) {
        service.deleteAchievement(id);
        return "Deleted successfully";
    }
}