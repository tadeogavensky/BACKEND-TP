package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.services.DentistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "api/v1/dentist")
@CrossOrigin(origins = "http://localhost:3000")
public class DentistController {
    @Autowired
    DentistService dentistService;

    @GetMapping(path = "/findAll")
    public List<Dentist> findAll() {
        return dentistService.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Dentist> findById(@PathVariable("id") Long id) {
        return dentistService.findById(id);
    }

    @PostMapping(path = "/",consumes = "application/json")
    public ResponseEntity<?> save(@RequestBody Dentist dentist) {
        Dentist existingDentistByName = dentistService.findByRegistrationNumber(dentist.getRegistrationNumber());
        Dentist existingDentistByRN = dentistService.findByDentist(dentist.getFirstName(),dentist.getLastName());

        if (existingDentistByName != null) {
            return ResponseEntity.status(HttpStatus.FOUND).body("Dentist already exists");
        }else if(existingDentistByRN != null){
            return ResponseEntity.status(HttpStatus.FOUND).body("Dentist already exists!");
        }else{
            dentistService.save(dentist);
            return ResponseEntity.ok(dentistService.findById(dentist.getId()));
     }
    }

@GetMapping(path = "/details")
public Dentist getDentistBy(@RequestBody Dentist dentist) {
    return dentistService.update(dentist);
}
    @PutMapping(path = "/{id}")
    public Dentist update(@RequestBody Dentist dentist) {
       return dentistService.update(dentist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Dentist> safeDelete(@PathVariable Long id){
        return dentistService.safeDelete(id);
    }
}
