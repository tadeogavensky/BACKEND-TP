package com.example.backend_v2.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "street", nullable = false)
    private String street;
    @Column(name = "number", nullable = false)
    private int number;

    @Column(name = "zip_code", nullable = false)
    private int zipcode;
    @Column(name = "state", nullable = false)
    private String state;

    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Column(name = "deleted", nullable = false)
    private Boolean deleted;


    public Address(String street, int number, int zipcode, String state, boolean deleted) {
        this.street = street;
        this.number = number;
        this.zipcode = zipcode;
        this.state = state;
        this.deleted = false;

    }

    public Address() {
    }

    public Long getId() {
        return id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
