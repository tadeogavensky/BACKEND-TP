package com.example.backendtp.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "turnos")
public class Turno {
    private boolean deleted;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Paciente paciente;
    private Odontologo odontologo;
    @Column(name = "fecha_alta", columnDefinition = "DATE")
    private LocalDate fechaAlta;

    public Turno(boolean deleted, Paciente paciente, Odontologo odontologo, LocalDate fechaAlta) {
        this.deleted = deleted;
        this.paciente = paciente;
        this.odontologo = odontologo;
        this.fechaAlta = fechaAlta;
    }

    public Turno() {
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }
}
