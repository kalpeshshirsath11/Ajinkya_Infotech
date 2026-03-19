package com.Ajinkya.Infotech.repository;

import com.Ajinkya.Infotech.model.HeroSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroSectionRepository extends JpaRepository<HeroSection, Long> {

    List<HeroSection> findByActiveTrueOrderByDisplayOrderAsc();
}
