package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.User;
import com.example.backend_v2.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    UserService usuarioService = new UserService();

    @PostMapping(path = "/login")
    public User login(@ModelAttribute("username") String username, @ModelAttribute("password") String password){
        return usuarioService.login(username, password);
    }
    @PostMapping(path = "/signup")
    public User signup(@ModelAttribute("username") User usuario){

        return usuarioService.signup(usuario);
    }

}
