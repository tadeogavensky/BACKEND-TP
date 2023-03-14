package com.example.backendtp.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class CentroOdontologiaController {

    @GetMapping("/")
    public String getHome() {
        return "home";
    }
}
