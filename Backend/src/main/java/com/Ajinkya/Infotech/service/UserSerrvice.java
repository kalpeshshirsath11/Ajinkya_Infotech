package com.Ajinkya.Infotech.service;

import com.Ajinkya.Infotech.model.User;
import com.Ajinkya.Infotech.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class UserSerrvice {

    @Autowired
    private UserRepo repo;
    //private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    public User adduser(User user) {

        repo.save(user);
        return user;
    }

    public Optional<String> getRole(String email) {
        return repo.findRoleByEmail(email);
    }

    public Optional<String> getImageByEmail(String email) {
        return repo.findImageByEmail(email);
    }
}
