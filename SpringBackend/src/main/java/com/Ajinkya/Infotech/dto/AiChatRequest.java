package com.Ajinkya.Infotech.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiChatRequest {

    @NotBlank(message = "Question cannot be blank")
    @Size(min = 1, max = 5000, message = "Question must be between 1 and 5000 characters")
    private String question;
}
