package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.model.HeroSection;
import com.Ajinkya.Infotech.repository.HeroSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HeroSectionService {

    @Autowired
    private HeroSectionRepository repository;

    //  Get all active hero slides
    public List<HeroSection> getActiveHeroSections() {
        return repository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    //  Add new slide (Admin)
    public HeroSection create(HeroSection hero) {
        return repository.save(hero);
    }

    //  Update slide
    public HeroSection update(Long id, HeroSection updated) {
        HeroSection hero = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero not found"));

        hero.setTitle(updated.getTitle());
        hero.setDescription(updated.getDescription());
        hero.setImageUrl(updated.getImageUrl());
        hero.setActive(updated.isActive());
        hero.setDisplayOrder(updated.getDisplayOrder());

        return repository.save(hero);
    }

    //  Delete
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
