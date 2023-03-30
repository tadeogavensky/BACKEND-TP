package com.example.backend_v2.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "appoitments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

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

    @Column(name = "deleted", nullable = false)
    private boolean deleted;

    public Appointment(LocalDateTime dateTime, Patient patient, Dentist dentist, boolean assisted) {
        this.patient = patient;
        this.dentist = dentist;
        this.dateTime = dateTime;
        this.assisted = false;
        this.deleted = false;
    }

    public Appointment() {
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
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


    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", dateTime=" + dateTime +
                ", dentist=" + dentist +
                ", patient=" + patient +
                ", deleted=" + deleted +
                ", assisted=" + assisted +
                '}';
    }
}
