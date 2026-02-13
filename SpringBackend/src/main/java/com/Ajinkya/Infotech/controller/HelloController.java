package com.Ajinkya.Infotech.controller;


import com.Ajinkya.Infotech.dto.HelloDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HelloController {

    @PostMapping("/hello")
    public ResponseEntity<String> Hello(@RequestBody HelloDto req){
        return new ResponseEntity<>(req.getUsername(), HttpStatus.ACCEPTED);


    }
}
