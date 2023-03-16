package com.example.backendtp.controllers;


import com.example.backendtp.entities.UsuarioEntity;
import com.example.backendtp.models.Usuario;
import com.example.backendtp.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UsuarioController {

    UsuarioService usuarioService = new UsuarioService();


    @GetMapping("/login")
    public String getLoginForm() {
        return "login";
    }

    @PostMapping(path = "/login")
    public Usuario login(@ModelAttribute("username") String username, @ModelAttribute("password") String password){
        return usuarioService.login(username, password);


    }

    @GetMapping("/signup")
    public String getSignupForm() {
        return "signup";
    }


    @PostMapping(path = "/signup")
    public Usuario signup(@ModelAttribute("username") Usuario usuario){

        return usuarioService.signup(usuario);
    }

}
