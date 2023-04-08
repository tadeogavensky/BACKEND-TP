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

    @Column (name = "deleted", nullable = false)
    private boolean deleted;


    public User(String username, String password) {
        this.username = username;
        this.password = password;
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
                ", deleted=" + deleted +
                '}';
    }
}
