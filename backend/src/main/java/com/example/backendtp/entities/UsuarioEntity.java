package com.example.backendtp.entities;

import com.example.backendtp.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioEntity extends JpaRepository<Usuario,Long> {

    @Query("SELECT FROM users u WHERE u.username = :username")
    Usuario findByUserName(@Param("username") String name);



    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
    default Usuario findByUserNameAndPassword(@Param("username") String name, @Param("password") String encryptedPassword){
        Usuario usuario = findByUserName(name);
        if (usuario != null && new BCryptPasswordEncoder().matches(encryptedPassword, usuario.getPassword())) {
            return usuario;
        } else {
            return null;
        }
    }
}