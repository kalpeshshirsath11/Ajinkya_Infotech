package com.Ajinkya.Infotech.service;


import com.Ajinkya.Infotech.model.TrainingContent;
import com.Ajinkya.Infotech.repository.TrainingContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingContentService {

    @Autowired
    private TrainingContentRepository repo;

    public TrainingContent addAchievement(TrainingContent content) {
        return repo.save(content);
    }

    public List<TrainingContent> getAllAchievements() {
        return repo.findAll();
    }

    public void deleteAchievement(Long id) {
        repo.deleteById(id);
    }

    public TrainingContent getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }
}