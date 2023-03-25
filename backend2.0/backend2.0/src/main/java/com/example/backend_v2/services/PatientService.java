package com.example.backend_v2.services;

import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.repositories.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public void PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }
    private final Logger log = LoggerFactory.getLogger(PatientService.class);

    public List<Patient> findAll(){

        return patientRepository.findAll();
    }

    public List<Patient> findAllNotDeleted(){
        return patientRepository.findAllNotDeleted();
    }

    public Optional<Patient> findById(Long id){
        return  patientRepository.findById(id);
    }


    public Patient findByDNI(int dni){
        return patientRepository.findByDNI(dni);
    }
    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient update( Patient patient) {
        return patientRepository.save(patient);

    }

    public Patient safeDelete(Long id){
        Optional<Patient> optionalPatient = patientRepository.findById(id);
        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();
            patient.setDeleted(true);
            System.out.println(patient);
            return patientRepository.save(patient);
        } else {
            return null;
        }
    }

}
