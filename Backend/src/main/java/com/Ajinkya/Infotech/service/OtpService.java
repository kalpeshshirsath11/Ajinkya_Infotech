package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.Util.OtpUtil;
import com.Ajinkya.Infotech.model.Otp;
import com.Ajinkya.Infotech.repository.OtpRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OtpService {

    @Autowired
    private OtpUtil otpUtil;

    @Autowired
    private EmailService emailService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    private OtpRepository otprepo;

    @Transactional
    public void add(Otp user) {

            otprepo.deleteByEmail(user.getEmail());

        String otp = otpUtil.generateOtp();
        user.setOtp(encoder.encode(otp));
        user.setPassword(encoder.encode(user.getPassword()));
        String subject = "Otp From Ajinkya infotech";
        String messege = "Your one time otp for register is: "+otp;
        emailService.sendSimpleMail(user.getEmail(),subject,messege);
         otprepo.save(user);



    }

    public Optional<Otp> getUser(String email) {
        return otprepo.findByEmail(email);
    }
}
