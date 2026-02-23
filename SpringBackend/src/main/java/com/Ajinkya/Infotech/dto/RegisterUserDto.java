package com.Ajinkya.Infotech.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class RegisterUserDto {
    private String name;
    private String email;

    private String mobileNumber;
    private String password;
}

