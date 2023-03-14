package com.example.backendtp.controllers;


import com.example.backendtp.entities.UsuarioEntity;
import com.example.backendtp.models.Paciente;
import com.example.backendtp.models.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/user")
public class UsuarioController {

    private final UsuarioEntity usuarioEntity;

    public UsuarioController(UsuarioEntity usuarioEntity) {
        this.usuarioEntity = usuarioEntity;
    }


    @GetMapping("/login")
    public String getLoginForm() {
        return "login";
    }

    @PostMapping(path = "/login")
    public String login(@ModelAttribute("username") String username, @ModelAttribute("password") String password, Model model){

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Usuario usuario = usuarioEntity.findByUserNameAndPassword(username, passwordEncoder.encode(password));
        if (usuario != null) {
            return "redirect:/home";
        } else {
            model.addAttribute("error", "El usuario o contraseña son incorrectos");
            return "login";
        }
    }

    @GetMapping("/signup")
    public String getSignupForm() {
        return "signup";
    }


    @PostMapping(path = "/signup")
    public String signup(@ModelAttribute("username") Usuario usuario, Model model){

        Optional<Usuario> OptUsuario = Optional.ofNullable(usuarioEntity.findByUserName(usuario.getUsername()));
        if (OptUsuario.isPresent()){
            model.addAttribute("error", "El usuario ya existe!");
            return "login";
        }else{
            usuarioEntity.save(usuario);
            return "redirect:/home";
        }

    }

}
