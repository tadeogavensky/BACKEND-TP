package com.example.backend_v2.controllers;

import com.example.backend_v2.entities.Appointment;
import com.example.backend_v2.entities.AppointmentRequest;
import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.services.AppointmentService;
import com.example.backend_v2.services.DentistService;
import com.example.backend_v2.services.PatientService;
import com.example.backend_v2.utils.IsNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


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


   /* @GetMapping(path = "/findAll")
    public List<Appointment> findAll() {
        return appointmentService.findAll();
    }*/

    @GetMapping(path = "/findAll")
    public List<Appointment> findAllNotDeleted() {
        return appointmentService.findAllNotDeleted();
    }


    @GetMapping(path = "/{id}")
    public Optional<Appointment> findById(@PathVariable("id") Long id) {
        return appointmentService.findById(id);
    }


    @PostMapping(path = "/", consumes = "application/json")
    public ResponseEntity<?> save(@RequestBody AppointmentRequest payload) {
        System.out.println("DATETIME" + payload.getDateString());
        Appointment appointment = payload.getAppointment();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        LocalDateTime dateTimeFormatted = LocalDateTime.parse(payload.getDateString(), formatter);
        System.out.println("FORMATTED DATE " + dateTimeFormatted);
        appointment.setDateTime(dateTimeFormatted);
        System.out.println("FORMATTED DATE IN CLASS " + appointment.getDateTime());


        Optional<Dentist> dentist = dentistService.findById(appointment.getDentist().getId());
        Optional<Patient> patient = patientService.findById(appointment.getPatient().getId());

        if (patient.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
        }

        if (dentist.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dentist not found");
        }


        appointment.setDentist(dentist.get());
        appointment.setPatient(patient.get());

        Appointment appointment1 = appointmentService.save(appointment);
        System.out.println("TURNO RECIEN CREADO " + appointment1);
        return ResponseEntity.ok(appointmentService.findById(appointment.getId()));

    }


    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable(value = "id") Long appointmentId,
                                                         @RequestBody AppointmentRequest appointmentDetails) {

        Optional<Appointment> appointment = appointmentService.findById(appointmentId);


        if (appointment.isEmpty()) {
            ResponseEntity.status(HttpStatus.FOUND).body("Appointment not found for this id :: " + appointmentId);
        }

        Appointment appointmentFound = appointment.get();

        IsNull isNull = new IsNull();

        boolean existDentist = isNull.isNull(appointmentDetails.getAppointment().getDentist());
        boolean existPatient = isNull.isNull(appointmentDetails.getAppointment().getPatient());
        boolean existAssisted = isNull.isNull(appointmentDetails.getAppointment().isAssisted());
        boolean existDateTime = isNull.isNull(appointmentDetails.getDateString());

        if (!existDentist) {
            System.out.println("EXISTE DENTISTA? " + appointmentDetails.getAppointment().getDentist());
            appointmentFound.setDentist(appointmentDetails.getAppointment().getDentist());
        }
        if (!existPatient) {
            appointmentFound.setPatient(appointmentDetails.getAppointment().getPatient());
        }
        if (!existAssisted) {
            appointmentFound.setAssisted(appointmentDetails.getAppointment().isAssisted());
        }
        if (!existDateTime) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
            LocalDateTime dateTimeFormatted = LocalDateTime.parse(appointmentDetails.getDateString(), formatter);
            appointmentFound.setDateTime(dateTimeFormatted);
        }

        Appointment updatedAppointment = appointmentService.save(appointmentFound);
        return ResponseEntity.ok(updatedAppointment);
    }


    @GetMapping("/{appointmentId}/dentist")
    public ResponseEntity<Dentist> getDentistForAppointment(@PathVariable Long appointmentId) {
        Dentist dentist = appointmentService.getDentistForAppointment(appointmentId);
        return ResponseEntity.ok(dentist);
    }



    @GetMapping("/appointments/dentist/{dentistId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDentist(@PathVariable Long dentistId) {
        List<Appointment> appointments = appointmentService.getAppointmentsForDentist(dentistId);
        return ResponseEntity.ok(appointments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> safeDelete(@PathVariable(value = "id") Long id) {
        if (appointmentService.safeDelete(id) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment could not be found");
        }
        return ResponseEntity.ok().body("Appointment deleted successfully");
    }


}
