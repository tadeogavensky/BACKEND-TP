package com.example.backend_v2.controllers;

import com.example.backend_v2.entities.Address;
import com.example.backend_v2.entities.Appointment;
import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.services.AppointmentService;
import com.example.backend_v2.services.DentistService;
import com.example.backend_v2.services.PatientService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/appointment")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;

    @Autowired
    DentistService dentistService;

    @Autowired
    PatientService patientService;

    private final Logger log = LoggerFactory.getLogger(AppointmentController.class);


    @GetMapping(path = "/findAll")
    public List<Appointment> findAll() {
        return appointmentService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Appointment> findById(@PathVariable("id") Long id) {
        return appointmentService.findById(id);
    }


    @PostMapping(path = "/", consumes = "application/json")
    public ResponseEntity<?> save(@RequestBody Appointment appointment) {


        System.out.println("new appointment " + appointment);


        return ResponseEntity.ok(appointmentService.save(appointment));
    }


    @GetMapping("/{appointmentId}/dentist")
    public ResponseEntity<Dentist> getDentistForAppointment(@PathVariable Long appointmentId) {
        Dentist dentist = appointmentService.getDentistForAppointment(appointmentId);
        return ResponseEntity.ok(dentist);
    }



    @GetMapping("/{appointmentId}/patient")
    public ResponseEntity<Patient> getPatientForAppointment(@PathVariable Long appointmentId) {
        Patient patient = appointmentService.getPatientForAppointment(appointmentId);
        return ResponseEntity.ok(patient);
    }


    @GetMapping("/appointments/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable Long patientId) {
        List<Appointment> appointments = appointmentService.getAppointmentsForPatient(patientId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/appointments/dentist/{dentistId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDentist(@PathVariable Long dentistId) {
        List<Appointment> appointments = appointmentService.getAppointmentsForDentist(dentistId);
        return ResponseEntity.ok(appointments);
    }




}
