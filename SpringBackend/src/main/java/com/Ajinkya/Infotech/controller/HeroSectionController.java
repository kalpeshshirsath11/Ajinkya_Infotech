package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.model.HeroSection;
import com.Ajinkya.Infotech.service.HeroSectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/hero")
public class HeroSectionController {

    @Autowired
    private HeroSectionService service;

    //  GET
    @GetMapping("/active")
    public List<HeroSection> getActiveHeroes() {
        return service.getActiveHeroSections();
    }

    //  CREATE
    @PostMapping
    public HeroSection create(@RequestBody HeroSection hero) {
        return service.create(hero);
    }

    //  UPDATE (IMPORTANT FIX HERE)
    @PutMapping("/{id}")   //  NOT PostMapping
    public HeroSection update(@PathVariable Long id, @RequestBody HeroSection hero) {
        return service.update(id, hero);
    }

    //  DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}