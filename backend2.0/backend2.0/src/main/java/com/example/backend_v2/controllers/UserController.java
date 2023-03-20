package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.User;
import com.example.backend_v2.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<User> login(@RequestBody User user){
        String username = user.getUsername();
        String password = user.getPassword();
        return ResponseEntity.ok(userService.login(username, password));
    }

    @PostMapping(path = "/signup", consumes = "application/json")
    public ResponseEntity<User> signup(@RequestBody User user){
        System.out.println(user.toString());


        return ResponseEntity.ok(userService.signup(user));

    }

}
