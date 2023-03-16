package com.example.backendtp.service;

import com.example.backendtp.controllers.UsuarioController;
import com.example.backendtp.entities.UsuarioEntity;
import com.example.backendtp.models.Usuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Optional;

public class UsuarioService {
    private UsuarioEntity usuarioEntity;

    public void UsuarioController(UsuarioEntity usuarioEntity) {
        this.usuarioEntity = usuarioEntity;
    }

    private final Logger log = LoggerFactory.getLogger(UsuarioController.class);


    public Usuario login(String username, String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return usuarioEntity.findByUserNameAndPassword(username, passwordEncoder.encode(password));
    }

    public Usuario signup(Usuario usuario){

           return usuarioEntity.save(usuario);

    }
}