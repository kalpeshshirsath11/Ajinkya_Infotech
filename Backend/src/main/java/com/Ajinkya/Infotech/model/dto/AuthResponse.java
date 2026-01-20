package com.Ajinkya.Infotech.model.dto;

public record AuthResponse(
        String token,
        String role,
        String email,
        String image


) {}