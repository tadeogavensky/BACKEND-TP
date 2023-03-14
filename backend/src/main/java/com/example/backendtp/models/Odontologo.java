package com.example.backendtp.models;

import jakarta.persistence.*;
import org.hibernate.*;
import org.hibernate.annotations.JdbcType;


import java.util.ArrayList;
import java.util.List;

@Entity
public class Odontologo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "apellido", columnDefinition = "VARCHAR(255)")
    private String apellido;

    @Column(name = "nombre", columnDefinition = "VARCHAR(255)")
    private String nombre;

    @Column(name = "matricula", columnDefinition = "VARCHAR(255)")
    private String matricula;

    @OneToMany(mappedBy = "odontologo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Paciente> pacientes;

    @Column(name = "deleted", columnDefinition = "BOOLEAN")
    private Boolean deleted;


    public Odontologo(String apellido, String nombre, String matricula, boolean deleted) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.matricula = matricula;
        this.deleted = deleted;
    }
    public Odontologo(){}

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

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public List<Paciente> getPacientes() {
        return pacientes;
    }

    public void setPacientes(List<Paciente> pacientes) {
        this.pacientes = pacientes;
    }

    public boolean isDeleted() {
        return deleted;
    }
}
