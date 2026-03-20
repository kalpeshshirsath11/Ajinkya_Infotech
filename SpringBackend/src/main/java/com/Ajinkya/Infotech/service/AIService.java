package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.dto.AiChatRequest;
import com.Ajinkya.Infotech.dto.AiChatResponse;
import com.Ajinkya.Infotech.dto.AiIngestRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIService {

    
    private final RestTemplate restTemplate;

    // It is best practice to externalize URLs to application.properties
    // Assuming you might add: python.service.url=http://localhost:8000 in application.properties
    // If not, you can keep the hardcoded string or use @Value("${python.service.url:http://localhost:8000}")
    @Value("${python.service.url:http://localhost:8000}")
    private   String pythonServiceUrl;


    public String getAnswerFromAI(String question) {
        try {
            String url = pythonServiceUrl + "/chat";
            AiChatRequest request = new AiChatRequest(question);
            AiChatResponse response = restTemplate.postForObject(url, request, AiChatResponse.class);
            return (response != null) ? response.getAnswer() : "AI is silent.";
        } catch (Exception e) {
            log.error("Error connecting to AI Brain: ", e);
            return "Error connecting to AI Brain: " + e.getMessage();
        }
    }

    public void ingestContent(String content, String sourceId) {
        try {
            String url = pythonServiceUrl + "/ingest";
            AiIngestRequest request = new AiIngestRequest(content, sourceId);
            restTemplate.postForObject(url, request, String.class);
            log.info(" Sent to AI: {}", sourceId);
        } catch (Exception e) {
            log.error(" Failed to train AI: ", e);
        }
    }
}

