package com.example.backend_v2.services;


import com.example.backend_v2.entities.User;
import com.example.backend_v2.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.xml.transform.Result;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public User login(String username, String password) {
        System.out.println("usuario " +username);
        System.out.println("password " + password);
        User userFound = userRepository.findByUsernameAndPassword(username, password);
        if (userFound == null) {
            log.warn("User not found or invalid password");
        }else{
            System.out.println("Usuario encontrado "+userFound);
        }

        return userFound;
    }



    public List<User> findAll(){
        return  userRepository.findAll();
    }





    public User signup(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
