package com.Ajinkya.Infotech.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiIngestRequest {

    @NotBlank(message = "Text cannot be blank")
    @Size(min = 1, max = 10000, message = "Text must be between 1 and 10000 characters")
    private String text;

    @JsonProperty("source_id")
    @NotBlank(message = "Source ID cannot be blank")
    @Size(max = 255, message = "Source ID must not exceed 255 characters")
    private String sourceId;
}
