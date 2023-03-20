package com.example.backend_v2.controllers;

import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.entities.User;
import com.example.backend_v2.services.AddressService;
import com.example.backend_v2.services.PatientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    @Autowired
    PatientService patientService;

    @Autowired
    AddressService addressService;


    private final Logger log = LoggerFactory.getLogger(PatientController.class);



    @GetMapping(path = "/findAll")
    public List<Patient> findAll() {
        return patientService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(patientService.findById(id));
    }

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Patient patient) {
        System.out.println("Patient " +patient.toString());

        Patient existingPatient = patientService.findByDNI(patient.getDni());

        if (existingPatient != null) {
            return ResponseEntity.status(HttpStatus.FOUND).body("Patient already exists!");
        } else {
            addressService.save(patient.getAddress());
            return ResponseEntity.ok(patientService.save(patient));
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> update(@ModelAttribute("patient") Patient patient) {
        return ResponseEntity.ok(patientService.update(patient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Patient> safeDelete(@PathVariable Long id){
        return patientService.safeDelete(id);
    }
}
