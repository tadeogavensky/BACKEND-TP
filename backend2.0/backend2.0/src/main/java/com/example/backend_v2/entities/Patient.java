package com.example.backend_v2.entities;

import jakarta.persistence.*;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments;


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

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public boolean isDeleted() {
        return deleted;
    }
}
