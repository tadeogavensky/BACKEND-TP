package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.User;
import com.example.backend_v2.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "/")
    public ResponseEntity<String> root() {
        return ResponseEntity.ok("HOLA!!!!!!!");
    }
    @GetMapping(path = "/findAll")
    public List<User> findAll() {
        return userService.findAll();
    }

    @PostMapping(path = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody User user){
        String username = user.getUsername();
        String password = user.getPassword();
        User loginUser = userService.login(username, password);
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found or invalid data");
        } else {
            return ResponseEntity.ok(loginUser);
        }
    }


    @PostMapping(path = "/signup", consumes = "application/json")
    public ResponseEntity<?> signup(@RequestBody User user){
        User existingUser = userService.findByUsername(user.getUsername());
        if(existingUser != null){
            return ResponseEntity.status(HttpStatus.FOUND).body("User already exists!");
        }else{
            return ResponseEntity.ok(userService.signup(user));

        }

    }

}
