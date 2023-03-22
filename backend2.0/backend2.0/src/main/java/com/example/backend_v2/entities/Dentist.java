package com.example.backend_v2.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "dentists")
public class Dentist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "registration_number", nullable = false)
    private int registrationNumber;




    @Column(name = "deleted", nullable = false)
    private boolean deleted;


    @Override
    public String toString() {
        return "Dentist{" +
                "id=" + id +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", registrationNumber=" + registrationNumber +
                ", deleted=" + deleted +
                '}';
    }

    public Dentist(String lastName, String firstName, int registrationNumber, boolean deleted) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.registrationNumber = registrationNumber;
        this.deleted = false;
    }
    public Dentist(){}


    public Long getId() {
        return id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastname) {
        this.lastName = lastname;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstname) {
        this.firstName = firstname;
    }


    public int getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(int registrationNumber) {
        this.registrationNumber = registrationNumber;
    }


    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
    public boolean isDeleted() {
        return deleted;
    }
}
