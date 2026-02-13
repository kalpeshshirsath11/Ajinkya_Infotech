package com.Ajinkya.Infotech.dto;

public record AuthResponse(
        String token,
        String role,
        String email,
        String image


) {}