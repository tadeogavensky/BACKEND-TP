package com.example.backend_v2.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;


import java.time.LocalDate;


@Entity
@Table(name = "appoitments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name="date")
    private LocalDate date;


    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;


    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dentist_id")
    private Dentist dentist;

    @Column(name = "assisted")
    private boolean assisted;

    public Appointment(LocalDate date, Patient patient, Dentist dentist, boolean assisted) {
        this.patient = patient;
        this.dentist = dentist;
        this.date = date;
        this.assisted = assisted;
    }

    public Appointment() {
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDateTime() {
        return date;
    }

    public void setDateTime(LocalDate date) {
        date = date;
    }

    public Dentist getDentist() {
        return dentist;
    }

    public void setDentist(Dentist dentist) {
        this.dentist = dentist;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public boolean isAssisted() {
        return assisted;
    }

    public void setAssisted(boolean assisted) {
        this.assisted = assisted;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", date=" + date +
                ", dentist=" + dentist +
                ", patient=" + patient +
                ", assisted=" + assisted +
                '}';
    }
}
