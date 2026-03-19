package com.Ajinkya.Infotech.dto;

import com.Ajinkya.Infotech.Enums.RoleEnum;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class RegisterUserDto {
    private String name;
    private String email;

    private String mobileNumber;
    private String password;

    public RoleEnum Role;
}

