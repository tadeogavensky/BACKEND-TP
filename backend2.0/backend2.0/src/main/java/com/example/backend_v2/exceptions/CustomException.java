package com.example.backend_v2.exceptions;

public class CustomException extends Exception {
    private String message;

    public CustomException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}