package com.example.backendtp.entities;

import com.example.backendtp.models.Domicilio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DomicilioEntity extends JpaRepository<Domicilio,Long> {
}