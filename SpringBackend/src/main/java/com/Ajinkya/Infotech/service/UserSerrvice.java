package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.Util.OtpUtil;
import com.Ajinkya.Infotech.model.Otp;
import com.Ajinkya.Infotech.model.User;
import com.Ajinkya.Infotech.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserSerrvice {

    @Autowired
    private UserRepo repo;
    @Autowired
    OtpUtil otpUtil;

    @Autowired
    EmailService emailService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    // =========================================================
    // CREATE USER (ADMIN)
    // =========================================================
    public User adduser(User user) {
        return repo.save(user);
    }
    @Transactional
    public void sendCredentialsEmail(String email, String password) {

        String subject = "Login Credentials - Ajinkya Infotech";

        String message = "Hello,\n\n" +
                "Your account has been created successfully.\n\n" +
                "Login Details:\n" +
                "Email: " + email + "\n" +
                "Password: " + password + "\n\n" +
                "Please change your password after first login.\n\n" +
                "Regards,\nAjinkya Infotech Team";

        emailService.sendSimpleMail(email, subject, message);
    }

    // =========================================================
    // FIND USER BY EMAIL
    // =========================================================
    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    // =========================================================
    // GET ROLE
    // =========================================================
    public Optional<String> getRole(String email) {
        return repo.findRoleByEmail(email);
    }

    // =========================================================
    // GET ALL USERS (ADMIN)
    // =========================================================
    public List<User> getAll() {
        return repo.findAll();
    }

    // =========================================================
    // DELETE USER
    // =========================================================
    public void deleteUser(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        repo.deleteById(id);
    }

    // =========================================================
    // UPDATE PASSWORD
    // =========================================================
    public void updatePassword(String email, String newPassword) {

        Optional<User> userOpt = repo.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();

        user.setPassword(encoder.encode(newPassword));

        // mark first login false
        user.setIsFirstLogin(false);

        repo.save(user);
    }

    // =========================================================
    // ACTIVATE / DEACTIVATE USER (ADMIN FEATURE - OPTIONAL)
    // =========================================================
    public void updateUserStatus(Long id, Boolean status) {

        Optional<User> userOpt = repo.findById(id);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();
        user.setIsActive(status);

        repo.save(user);
    }
}