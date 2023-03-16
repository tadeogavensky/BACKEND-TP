package com.example.backendtp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "domicilios")
public class Domicilio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "calle", columnDefinition = "varchar(255)")
    private String calle;

    @Column(name = "numero", columnDefinition = "int")

    private int numero;
    @Column(name = "localidad", columnDefinition = "varchar(255)")

    private String localidad;
    @Column(name = "provincia", columnDefinition = "varchar(255)")
    private String provinicia;

    @OneToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @Column(name = "deleted", columnDefinition = "tinyint")
    private boolean deleted;

    public Domicilio(String calle, int numero, String localidad, String provinicia, boolean deleted) {
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.provinicia = provinicia;
        this.deleted = deleted;

    }

    public Domicilio() {
    }

    public Long getId() {
        return id;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getProvinicia() {
        return provinicia;
    }

    public void setProvinicia(String provinicia) {
        this.provinicia = provinicia;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
