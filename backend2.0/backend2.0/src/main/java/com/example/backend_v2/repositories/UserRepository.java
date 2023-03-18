package com.example.backend_v2.repositories;

import com.example.backend_v2.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT u FROM User u WHERE u.username = :username")
    User findByUserName(@Param("username") String name);



    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
    default User findByUserNameAndPassword(@Param("username") String username, @Param("password") String password){
        User user = findByUserName(username);
        if (user != null && password == user.getPassword()) {
            return user;
        } else {
            return null;
        }
    }
}