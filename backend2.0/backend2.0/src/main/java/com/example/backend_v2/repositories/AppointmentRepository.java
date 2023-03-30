package com.example.backend_v2.repositories;

import com.example.backend_v2.entities.Appointment;
import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    @Query("SELECT a FROM Appointment a WHERE a.deleted=false")
    List<Appointment> findAllNotDeleted();

    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId AND a.deleted = false")
    List<Appointment> findByPatientId(@Param("patientId") Long patientId);


    @Query("SELECT a FROM Appointment a WHERE a.dentist.id = :dentistId AND a.deleted = false")
    List<Appointment> findByDentistId(@Param("dentistId") Long dentistId);

    @Query("SELECT a FROM Appointment a WHERE a.dateTime = :date_time AND a.deleted = false")
    Appointment findByDateTime(@Param("date_time") LocalDateTime dateTime);

}
