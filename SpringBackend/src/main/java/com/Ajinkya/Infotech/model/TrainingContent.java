package com.Ajinkya.Infotech.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "training_content") // fixed typo + better naming
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // English fields
    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String content;

    private String image;

    // Marathi fields
    @Column(name = "title_m")
    private String titleM;

    @Column(name = "content_m", length = 1000)
    private String contentM;
}