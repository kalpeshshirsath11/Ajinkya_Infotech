package com.Ajinkya.Infotech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class InfotechApplication {

	public static void main(String[] args) {
		SpringApplication.run(InfotechApplication.class, args);
	}

}
