package com.Ajinkya.Infotech.controller;

import com.Ajinkya.Infotech.Enums.RoleEnum;
import com.Ajinkya.Infotech.dto.AuthResponse;
import com.Ajinkya.Infotech.dto.LoginRequest;
import com.Ajinkya.Infotech.dto.RegisterUserDto;
import com.Ajinkya.Infotech.model.User;
import com.Ajinkya.Infotech.service.JwtService;
import com.Ajinkya.Infotech.service.UserSerrvice;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserSerrvice userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwt;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    // =========================================================
    // 1. REGISTER USER (ONLY ADMIN)
    // =========================================================
    @PostMapping("/admin/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> registerUser(@RequestBody RegisterUserDto dto) {

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setMobileNumber(dto.getMobileNumber());
        user.setRole(dto.getRole());
        user.setIsActive(true);

        // Generate random password
        String rawPassword = UUID.randomUUID().toString().substring(0, 8);
        user.setPassword(encoder.encode(rawPassword));

        // Optional: first login flag
        user.setIsFirstLogin(true);

        userService.adduser(user);

        // TODO: Send email using nodemailer (email + rawPassword)
        userService.sendCredentialsEmail(dto.getEmail(),rawPassword);

        return ResponseEntity.ok("User created. Credentials sent via email.");
    }
    @PostMapping("/register-admin")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterUserDto dto) {

        // Check if admin already exists




        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setMobileNumber(dto.getMobileNumber());

        // FORCE ROLE = ADMIN (ignore incoming role)
        user.setRole(RoleEnum.ADMIN);
        user.setIsActive(true);

        // Use provided password (not random)
        user.setPassword(encoder.encode(dto.getPassword()));

        user.setIsFirstLogin(false);

        userService.adduser(user);

        return ResponseEntity.ok("Admin registered successfully");
    }
    // =========================================================
    // 2. LOGIN
    // =========================================================
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        Optional<User> userOpt = userService.findByEmail(request.email());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }

        User user = userOpt.get();

        if (!user.getIsActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(null);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String role = userDetails.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_", "");

        String token = jwt.generateToken(
                userDetails.getUsername(),
                role
        );

        return ResponseEntity.ok(
                new AuthResponse(token, role, request.email(), null)
        );
    }

    // =========================================================
    // 3. UPDATE PASSWORD
    // =========================================================
    @PatchMapping("/user/update-password")
    @PreAuthorize("hasAnyRole('STUDENT','TEACHER','ADMIN')")
    public ResponseEntity<String> updatePassword(
            @RequestParam String email,
            @RequestParam String newPassword
    ) {

        Optional<User> userOpt = userService.findByEmail(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        User user = userOpt.get();

        // Encode new password
        user.setPassword(encoder.encode(newPassword));

        // Mark first login completed
        user.setIsFirstLogin(false);

        userService.adduser(user);

        return ResponseEntity.ok("Password updated successfully");
    }

    // =========================================================
    // 4. DELETE USER (ONLY ADMIN)
    // =========================================================
    @DeleteMapping("/admin/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }
}