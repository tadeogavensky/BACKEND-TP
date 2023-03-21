package com.example.backend_v2.entities;

import jakarta.persistence.*;



@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "username", nullable = false)
    private String username;
    @Column (name = "password", nullable = false)
    private String password;

    @Column (name = "role", nullable = false)
    private boolean role;
    //1 para ADMIN, 0 para USER


    @Column (name = "deleted", nullable = false)
    private boolean deleted;


    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = false;
        this.deleted = false;
    }

    public User(){}

    public User(String user, String pass, boolean b) {
        this.username = user;
        this.password = pass;
        this.role = true;
        this.deleted = false;
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

    public boolean isRole() {
        return role;
    }

    public void setRole(boolean role) {
        this.role = role;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }





    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", deleted=" + deleted +
                '}';
    }
}
