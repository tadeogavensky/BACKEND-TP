package com.example.backend_v2.entities;

import jakarta.persistence.*;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "lastname", nullable = false )
    private String lastName;
    @Column(name = "firstname", nullable = false)
    private String firstName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dentist_id")
    private Dentist dentist;

    @Column(name = "dni", nullable = false)
    private Integer dni;

    @Column(name = "deleted", nullable = false)
    private boolean deleted;


    public Patient(String lastName, String firstname, Address address, Integer dni, boolean deleted) {
        this.lastName = lastName;
        this.firstName = firstname;
        this.address = address;
        this.dni = dni;
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

    public Dentist getDentist() {
        return dentist;
    }

    public void setDentist(Dentist dentist) {
        this.dentist = dentist;
    }

    public boolean isDeleted() {
        return deleted;
    }
}
