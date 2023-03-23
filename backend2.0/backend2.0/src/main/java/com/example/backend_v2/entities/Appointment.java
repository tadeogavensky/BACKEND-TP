package com.example.backend_v2.entities;

import jakarta.persistence.*;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;


@Entity
@Table(name = "appoitments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name="date_time")
    private LocalDateTime date_time;

    /*    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})*/
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dentist_id")
    private Dentist dentist;
  /*  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})*/
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Column(name = "assisted")
    private boolean assisted;

    public Appointment(LocalDateTime date_time, Patient patient, Dentist dentist, boolean assisted) {
        this.patient = patient;
        this.dentist = dentist;
        this.date_time = date_time;
        this.assisted = false;
    }

    public Appointment() {
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateTime() {
        return date_time;
    }

    public void setDateTime(LocalDateTime date_time) {
        date_time = date_time;
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
                ", date_time=" + date_time +
                ", dentist=" + dentist +
                ", patient=" + patient +
                ", assisted=" + assisted +
                '}';
    }
}
