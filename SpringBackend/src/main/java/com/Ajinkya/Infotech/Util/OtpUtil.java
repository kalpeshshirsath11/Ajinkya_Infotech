package com.Ajinkya.Infotech.Util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class OtpUtil {

    public String generateOtp() {
        return String.valueOf(new Random().nextInt(900000) + 100000);
    }
}