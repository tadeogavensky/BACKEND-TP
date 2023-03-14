package com.example.backendtp.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "apellido", columnDefinition = "varchar(255)")
    private String apellido;
    @Column(name = "nombre", columnDefinition = "varchar(255)")
    private String nombre;
    @OneToOne(mappedBy = "paciente")
    private Domicilio domicilio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "odontologo_id")
    private Odontologo odontologo;
    @Column(name = "dni", columnDefinition = "INT")
    private Integer dni;
    @Column(name = "fecha_alta", columnDefinition = "DATE")
    private LocalDate  fechaAlta;
    @Column(name = "deleted", columnDefinition = "BOOLEAN")
    private boolean deleted;

    public Paciente(String apellido, String nombre, Domicilio domicilio, Integer dni, LocalDate  fechaAlta, boolean deleted) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.dni = dni;
        this.fechaAlta = fechaAlta;
        this.deleted = deleted;
    }

    public Paciente(){}

    public Long getId() {
        return id;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Domicilio getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(Domicilio domicilio) {
        this.domicilio = domicilio;
    }

    public Integer getDni() {
        return dni;
    }

    public void setDni(Integer dni) {
        this.dni = dni;
    }

    public LocalDate  getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDate  fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
    }

    public boolean isDeleted() {
        return deleted;
    }
}
