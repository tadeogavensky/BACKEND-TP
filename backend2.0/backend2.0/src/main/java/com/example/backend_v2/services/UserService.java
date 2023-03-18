package com.example.backend_v2.services;


import com.example.backend_v2.entities.User;
import com.example.backend_v2.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Optional;


@Service
public class UserService {
    private UserRepository userRepository;

    public void UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final Logger log = LoggerFactory.getLogger(UserService.class);


    public User login(String username, String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return userRepository.findByUserNameAndPassword(username, passwordEncoder.encode(password));
    }

    public User signup(User user){

        return userRepository.save(user);

    }
}