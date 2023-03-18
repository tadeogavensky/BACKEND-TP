package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.User;
import com.example.backend_v2.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
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

    @PostMapping(path = "/login")
    public ResponseEntity<User> login(/*@ModelAttribute("username") String username, @ModelAttribute("password") String password*/ @RequestBody String username,@RequestBody String password){
        System.out.println(username + " " + password);
        return ResponseEntity.ok(userService.login(username, password));
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<User> signup(@RequestBody User user){
        User createdUser = userService.signup(user);
        return ResponseEntity.ok(createdUser);
    }

}
