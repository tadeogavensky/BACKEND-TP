package com.example.backendtp.models;

import jakarta.persistence.*;

import java.nio.file.FileAlreadyExistsException;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    private boolean role;
    //1 para ADMIN, 0 para USER

    private boolean deleted;


    public Usuario(String username, String password, boolean role) {
        this.username = username;
        this.password = password;
        this.role = false;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
