package com.Ajinkya.Infotech.dto;

import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String mobileNumber;
    private String imageUrl;
    private Boolean isActive;

    private List<StudentEnrollmentDTO> enrollments;
}
