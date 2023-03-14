package com.example.backendtp.entities;

import com.example.backendtp.models.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OdontologoEntity extends JpaRepository<Odontologo,Long> {
}