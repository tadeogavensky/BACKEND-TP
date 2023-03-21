package com.example.backend_v2.repositories;


import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DentistRepository extends JpaRepository<Dentist,Long> {

    @Query("SELECT d FROM Dentist d WHERE d.registrationNumber = ?1")
    Dentist findByRegistrationNumber(int RN);
    @Query("SELECT d FROM Dentist d WHERE d.deleted=false")
    List<Dentist> findAllNotDeleted();
    @Query("SELECT d FROM Dentist d WHERE d.firstName = ?1 AND d.lastName = ?2")
    Dentist findByDentist(String firstName, String lastName);
}
