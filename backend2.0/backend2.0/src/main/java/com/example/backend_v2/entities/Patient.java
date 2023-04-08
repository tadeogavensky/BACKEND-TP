package com.example.backend_v2.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "last_name", nullable = false )
    private String lastName;
    @Column(name = "first_name", nullable = false)
    private String firstName;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "dni", nullable = false)
    private Integer dni;

    @Column(name = "deleted", nullable = false)
    private boolean deleted;


    public Patient(String lastName, String firstname,Integer dni, Address address, boolean deleted) {
        this.lastName = lastName;
        this.firstName = firstname;
        this.dni = dni;
        this.address = address;
        this.deleted = false;
    }

    public Patient(){}


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

   public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Integer getDni() {
        return dni;
    }

    public void setDni(Integer dni) {
        this.dni = dni;
    }



    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }


    public boolean isDeleted() {
        return deleted;
    }


    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", dni=" + dni +
                ", address=" + address +
                ", deleted=" + deleted +
                '}';
    }


}
