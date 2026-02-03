package com.Ajinkya.Infotech.repository;

import com.Ajinkya.Infotech.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {

         Optional<User> findByEmail(String email);

    Optional<String> findRoleByEmail(String email);


    @Query("SELECT u.imageUrl FROM User u WHERE u.email = :email")
    Optional<String> findImageByEmail(@Param("email") String email);
}
