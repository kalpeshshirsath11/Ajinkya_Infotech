package com.Ajinkya.Infotech.model;

import com.Ajinkya.Infotech.Enums.RoleEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verification")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String otp;
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private RoleEnum role;

    @Column(name = "is_active")
    private Boolean isActive = true;
    @CreationTimestamp
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "mobile_number", length = 15, unique = true)
    private String mobileNumber;
    private LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5);



}
