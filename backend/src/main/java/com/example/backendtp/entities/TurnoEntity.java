package com.example.backendtp.entities;

import com.example.backendtp.models.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurnoEntity extends JpaRepository<Turno,Long> {
}