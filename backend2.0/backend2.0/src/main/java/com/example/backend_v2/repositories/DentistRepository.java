package com.example.backend_v2.repositories;


import com.example.backend_v2.entities.Dentist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DentistRepository extends JpaRepository<Dentist,Long> {
}
