package com.example.backend_v2.repositories;

import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PatientRepository extends JpaRepository<Patient,Long> {

    @Query("SELECT p FROM Patient p WHERE p.dni = ?1")
    Patient findByDNI(int dni);
}
