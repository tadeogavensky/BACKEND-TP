package com.example.backend_v2.entities;

import jakarta.persistence.*;


import java.util.Date;

@Entity
@Table(name = "appoitments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name="date_time")
    private Date DateTime;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dentist_id")
    private Dentist dentist;

    @Column(name = "assisted")
    private boolean assisted;

    public Appointment(Date dateTime, Patient patient, Dentist dentist, boolean assisted) {
        DateTime = dateTime;
        this.patient = patient;
        this.dentist = dentist;
        this.assisted = assisted;
    }

    public Appointment() {
    }

    public Long getId() {
        return id;
    }

    public Date getDateTime() {
        return DateTime;
    }

    public void setDateTime(Date dateTime) {
        DateTime = dateTime;
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
                ", DateTime=" + DateTime +
                ", dentist=" + dentist +
                ", patient=" + patient +
                ", assisted=" + assisted +
                '}';
    }
}
