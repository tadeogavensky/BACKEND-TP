package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.Address;
import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.services.DentistService;
import com.example.backend_v2.utils.IsNull;
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

   /* @GetMapping(path = "/findAll")
    public List<Dentist> findAll() {
        return dentistService.findAll();
    }*/

    @GetMapping(path = "/findAll")
    public List<Dentist> findAllNotDeleted() {
        return dentistService.findAllNotDeleted();
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
    @PutMapping("/{id}")
    public ResponseEntity<Dentist> updateDentist(@PathVariable(value = "id") Long dentistId,
                                                 @RequestBody Dentist dentistDetails){

        Optional<Dentist> dentist = dentistService.findById(dentistId);


        if (dentist.isEmpty()) {
            ResponseEntity.status(HttpStatus.FOUND).body("Dentist not found for this id :: " + dentistId);
        }

        Dentist dentistFound = dentist.get();

        IsNull isNull = new IsNull();

        boolean existFirstName = isNull.isNull(dentistDetails.getFirstName());
        boolean existLastName = isNull.isNull(dentistDetails.getLastName());
        boolean existRegistrationNumber = isNull.isNull(dentistDetails.getRegistrationNumber());

        if (!existFirstName){
            dentistFound.setFirstName(dentistDetails.getFirstName());
        }
        if (!existLastName){
            dentistFound.setLastName(dentistDetails.getLastName());
        }
        if (!existRegistrationNumber){
            dentistFound.setRegistrationNumber(dentistDetails.getRegistrationNumber());
        }


        Dentist updatedDentist = dentistService.save(dentistFound);
        return ResponseEntity.ok(updatedDentist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> safeDelete(@PathVariable(value = "id") Long id) {
        if (dentistService.safeDelete(id) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dentist could not be found");
        }
        return ResponseEntity.ok().body("Dentist deleted successfully");
    }
}
