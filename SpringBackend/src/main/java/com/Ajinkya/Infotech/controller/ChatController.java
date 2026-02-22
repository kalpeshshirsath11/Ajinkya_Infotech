package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.dto.AiChatRequest;
import com.Ajinkya.Infotech.service.AIService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ChatController {


    // Final field allows Lombok to generate the constructor for injection
    private final AIService aiService;

    @PostMapping
// We reuse AiChatRequest here to automatically map JSON {"question": "..."} to the object
    public ResponseEntity<Map<String, String>> askBot(@Valid  @RequestBody AiChatRequest request) {
        String aiAnswer = aiService.getAnswerFromAI(request.getQuestion());
        return ResponseEntity.ok(Map.of("answer", aiAnswer));
    }


}

