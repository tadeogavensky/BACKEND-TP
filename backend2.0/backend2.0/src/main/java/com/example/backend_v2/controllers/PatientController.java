package com.example.backend_v2.controllers;

import com.example.backend_v2.entities.Address;
import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.exceptions.CustomException;
import com.example.backend_v2.services.AddressService;
import com.example.backend_v2.services.PatientService;
import com.example.backend_v2.utils.IsNull;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
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


 /*   @GetMapping(path = "/findAll")
    public List<Patient> findAll() {
        return patientService.findAll();
    }*/


    @GetMapping(path = "/findAll")
    public List<Patient> findAllNotDeleted() throws CustomException {
        try {
            return patientService.findAllNotDeleted();
        } catch (Exception e) {
            throw new CustomException("Error occurred while finding patients: " + e.getMessage());
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) throws CustomException {
        Optional<Patient> patient = patientService.findById(id);
        if (patient.isEmpty()) {
            throw new CustomException("Patient with ID " + id + " not found");
        }
        return ResponseEntity.ok(patient.get());
    }


    @GetMapping(path = "/byDNI")
    public ResponseEntity<?> findByDNI(@PathVariable("dni") int DNI) throws CustomException {
        Patient patient = patientService.findByDNI(DNI);
        if (patient == null) {
            throw new CustomException("Patient with DNI " + DNI + " not found");
        }
        return ResponseEntity.ok(patient);
    }


    @PostMapping(path = "/", consumes = "application/json")
    public ResponseEntity<?> save(@RequestBody Patient patient) throws CustomException {

        Patient existingPatient = patientService.findByDNI(patient.getDni());
        Optional<Address> existingAddress = addressService.findByAddress(patient.getAddress().getStreet(), patient.getAddress().getNumber(), patient.getAddress().getZipcode(), patient.getAddress().getState());
        if (existingPatient != null) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient already exists!");
            throw new CustomException("Patient already exists!");
        } else if (!StringUtils.isNumeric(String.valueOf(patient.getDni()))) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("DNI must be numeric");
            throw new CustomException("DNI must be numeric");
        } else if (existingAddress.isPresent()) {
            patient.setAddress(existingAddress.get());
            return ResponseEntity.ok(patientService.save(patient));
        } else {
            addressService.save(patient.getAddress());
            patientService.save(patient);

            return ResponseEntity.ok(patientService.findById(patient.getId()));
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<String> updatePatient(@PathVariable(value = "id") Long patientId,
                                                @RequestBody Patient patientDetails) throws CustomException {

        System.out.println(patientId);
        Optional<Patient> patient = patientService.findById(patientId);

        if (patient.isEmpty()) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found for this id :: " + patientId);
            throw new CustomException("Patient not found for this id :: " + patientId);
        }

        List<Patient> patientList = patientService.findAllNotDeleted();

        for (int i = 0; i < patientList.size(); i++) {
            if (Objects.equals(patientList.get(i).getDni(), patientDetails.getDni())){
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Already a patient with that DNI!");
                throw new CustomException("Already a patient with that DNI!");
            }
        }


        Patient patientFound = patient.get();

        IsNull isNull = new IsNull();

        boolean existFirstName = isNull.isNull(patientDetails.getFirstName());
        boolean existLastName = isNull.isNull(patientDetails.getLastName());
        boolean existDNI = isNull.isNull(patientDetails.getDni());
        boolean existAddress = isNull.isNull(patientDetails.getAddress());


        if (!existFirstName) {
            patientFound.setFirstName(patientDetails.getFirstName());
        }

        if (!existLastName) {
            patientFound.setLastName(patientDetails.getLastName());
        }
        if (!existDNI) {
            patientFound.setDni(patientDetails.getDni());
        }

        if (!existAddress) {
            Optional<Address> existingAddress = addressService.findByAddress(patientDetails.getAddress().getStreet(), patientDetails.getAddress().getNumber(), patientDetails.getAddress().getZipcode(), patientDetails.getAddress().getState());
            if (existingAddress.isEmpty()) {
                patientFound.getAddress().setStreet(patientDetails.getAddress().getStreet());
                patientFound.getAddress().setNumber(patientDetails.getAddress().getNumber());
                patientFound.getAddress().setZipcode(patientDetails.getAddress().getZipcode());
                patientFound.getAddress().setState(patientDetails.getAddress().getState());

                addressService.update(patientFound.getAddress());
            }
        }

        Patient updatedPatient = patientService.save(patientFound);
        return ResponseEntity.ok("Updated patient "+updatedPatient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> safeDelete(@PathVariable(value = "id") Long id) throws CustomException {
        if (patientService.safeDelete(id) == null) {
            throw new CustomException("Patient could not be found");
        }
        return ResponseEntity.ok().body("Patient deleted successfully");
    }

}
