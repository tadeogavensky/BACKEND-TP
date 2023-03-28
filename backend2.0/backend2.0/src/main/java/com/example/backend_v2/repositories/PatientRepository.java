package com.example.backend_v2.repositories;

import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient,Long> {

    @Query("SELECT p FROM Patient p WHERE p.deleted=false")
    List<Patient> findAllNotDeleted();
    @Query("SELECT p FROM Patient p WHERE p.dni = ?1 AND p.deleted = false")
    Patient findByDNI(int dni);
}
