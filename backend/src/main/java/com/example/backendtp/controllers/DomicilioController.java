package com.example.backendtp.controllers;

import com.example.backendtp.entities.DomicilioEntity;
import com.example.backendtp.models.Domicilio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping(path = "api/v1/domicilio")
public class DomicilioController {

    private final DomicilioEntity domicilioEntity;

    private final Logger log = LoggerFactory.getLogger(DomicilioController.class);

    public DomicilioController(DomicilioEntity domicilioEntity) {
        this.domicilioEntity = domicilioEntity;
    }

    @PostMapping()
    public Domicilio create(@RequestBody Domicilio domicilio, @RequestHeader HttpHeaders headers) {
        return domicilioEntity.save(domicilio);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Domicilio> update(@RequestBody Domicilio domicilio) {

        if(!domicilioEntity.existsById(domicilio.getId())){
            log.warn("Domicilio no existe!");
            return ResponseEntity.notFound().build();
        }
        Domicilio result =domicilioEntity.save(domicilio);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DomicilioEntity> safeDelete(@PathVariable Long id){
        if(!domicilioEntity.existsById(id)){
            log.warn("El domicilio no existe!");
            return ResponseEntity.notFound().build();
        }
        Optional<Domicilio> OptDomicilio = domicilioEntity.findById(id);
        if (OptDomicilio.isPresent()){
            Domicilio domicilio = OptDomicilio.get();
            domicilio.setDeleted(true);
            domicilioEntity.save(domicilio);
        }
        return ResponseEntity.noContent().build();
    }
}
