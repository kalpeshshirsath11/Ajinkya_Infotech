package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.Enums.RoleEnum;
import com.Ajinkya.Infotech.dto.*;
import com.Ajinkya.Infotech.model.Otp;
import com.Ajinkya.Infotech.model.User;
import com.Ajinkya.Infotech.service.CloudinaryService;
import com.Ajinkya.Infotech.service.JwtService;
import com.Ajinkya.Infotech.service.OtpService;
import com.Ajinkya.Infotech.service.UserSerrvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController("/user")
public class UserController {

    @Autowired
    private UserSerrvice userService;

    @Autowired
    private OtpService otpService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwt;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    CloudinaryService cloudinaryService;
    @PostMapping(
            value = "/requestOtp",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> requestOtp(
            @ModelAttribute RegisterUserDto dto,
            @RequestPart(value = "image", required = false) MultipartFile file
    ) throws IOException {
        Otp user = new Otp();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        user.setRole(RoleEnum.STUDENT);
        user.setIsActive(true);
        if(file == null || file.isEmpty()){
            user.setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhVSHxKxeD9Tdg65juWHA_tU_Hyt89DgJ3qQ&s");
        }
        else {
            String url = cloudinaryService.uploadImage(file);
            user.setImageUrl(url);
        }



        otpService.add(user);

        return new ResponseEntity<>("Otp Sent successfullyy",HttpStatus.OK);
    }

    @PostMapping(
            value = "/register"

    )
    public ResponseEntity<String> register(
            @RequestBody OtpDto dto

    ) throws Exception {
        Optional<Otp> userotp = otpService.getUser(dto.getEmail());
        User user = new User();

        if(userotp.isEmpty()) throw new Exception("Otp not Generated");
        boolean isValid = encoder.matches(dto.getOtp(), userotp.get().getOtp());
        if(isValid) {
            user.setName(userotp.get().getName());
            user.setPassword(userotp.get().getPassword());
            user.setEmail(userotp.get().getEmail());
            user.setRole(RoleEnum.STUDENT);
            user.setIsActive(true);


           user.setImageUrl(userotp.get().getImageUrl()); //  ONLY place imageData is set
            userService.adduser(user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Correct");
        }
        else{
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Incorrect otp");
        }
    }



    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request
    ) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        String role = userDetails.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_", "");

        String token = jwt.generateToken(
                userDetails.getUsername(), // email
                role
        );
        Optional<String> image = userService.getImageByEmail(request.email());
        return ResponseEntity.ok(
                new AuthResponse(token,role,request.email(),image.get())
        );
    }

}
