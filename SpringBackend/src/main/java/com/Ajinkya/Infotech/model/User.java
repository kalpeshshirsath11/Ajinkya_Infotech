package com.Ajinkya.Infotech.model;

import com.Ajinkya.Infotech.Enums.RoleEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleEnum role;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    //  Cloudinary image URL
    @Column(name = "image_url", length = 500)
    private String imageUrl;

    // Mobile number
    @Column(name = "mobile_number", length = 15, unique = true)
    private String mobileNumber;

    @OneToMany(mappedBy = "user")
    private List<Enrollment> enrollments;
}
