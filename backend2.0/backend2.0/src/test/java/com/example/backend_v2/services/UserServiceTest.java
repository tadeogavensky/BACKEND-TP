package com.example.backend_v2.services;

import com.example.backend_v2.entities.User;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.junit.runners.MethodSorters;
import org.springframework.boot.test.context.SpringBootTest;


@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(JUnit4.class)
@SpringBootTest
public class UserServiceTest {

    private static UserService userService = new UserService();

    @Test
    public void cargarDataSet() {
        User user1 = new User("USUARIO1","12345");
        User user2 = new User("USUARIO2","12345");

        userService.signup(user1);
        userService.signup(user2);


    }

}