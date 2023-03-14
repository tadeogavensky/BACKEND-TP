package com.example.backendtp.entities;

import com.example.backendtp.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteEntity extends JpaRepository<Paciente,Long> {
}