package com.example.backend_v2.controllers;


import com.example.backend_v2.config.JwtTokenUtil;
import com.example.backend_v2.entities.LoggedUser;
import com.example.backend_v2.entities.User;
import com.example.backend_v2.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    JwtTokenUtil jwtTokenUtil;


    LoggedUser loggedUser = new LoggedUser();


    @GetMapping(path = "/")
    public ResponseEntity<String> root() {
        return ResponseEntity.ok("HOLA!!!!!!!");
    }
    @GetMapping(path = "/findAll")
    public List<User> findAll() {
        return userService.findAll();
    }

   /* @PostMapping(path = "/details")
    public User details(@RequestBody String username) throws JsonProcessingException {
        return ResponseEntity.ok(userService.findByUsername(username)).getBody();
    }*/
    @PostMapping(path = "/details")
    public User findByToken(@RequestBody String token) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, String> jsonMap = objectMapper.readValue(token, new TypeReference<Map<String,String>>(){});


        String retrievedToken = jsonMap.get("token");

        System.out.println("token? "+ retrievedToken);

        return ResponseEntity.ok(loggedUser.getUser()).getBody();
    }
    @PostMapping(path = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody User user){
        String username = user.getUsername();
        String password = user.getPassword();
        User loginUser = userService.login(username, password);
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found or invalid data");
        } else {
            String token = jwtTokenUtil.generateToken(username);

            loggedUser.setUser(loginUser);
            loggedUser.setToken(token);
            System.out.println("token of logged in user " + loggedUser.getToken());
            System.out.println("user of logged in user " + loggedUser.getUser().toString());

            return ResponseEntity.ok(loggedUser);
        }
    }



    @PostMapping(path = "/signup", consumes = "application/json")
    public ResponseEntity<?> signup(@RequestBody User user){
        User existingUser = userService.findByUsername(user.getUsername());
        if(existingUser != null){
            return ResponseEntity.status(HttpStatus.FOUND).body("User already exists!");
        }else{
            ResponseEntity.ok(userService.signup(user));
            loggedUser.setUser(user);
            return login(loggedUser.getUser());

        }

    }

}
