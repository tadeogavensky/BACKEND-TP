package com.example.backendtp.service;

import com.example.backendtp.controllers.DomicilioController;
import com.example.backendtp.entities.DomicilioEntity;
import com.example.backendtp.models.Domicilio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public class DomicilioService {
    private DomicilioEntity domicilioEntity;

    public void DomicilioController(DomicilioEntity domicilioEntity) {
        this.domicilioEntity = domicilioEntity;
    }
    private final Logger log = LoggerFactory.getLogger(DomicilioController.class);

    public List<Domicilio> findAll(){
        return  domicilioEntity.findAll();
    }

    public ResponseEntity<Domicilio> findById(Long id){
        Optional<Domicilio> OptDomicilio =  domicilioEntity.findById(id);
        return OptDomicilio.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Domicilio save(Domicilio domicilio) {
        return domicilioEntity.save(domicilio);
    }

    public Domicilio update( Domicilio domicilio) {

        if(!domicilioEntity.existsById(domicilio.getId())){
            log.warn("Domicilio no existe!");
        }
        return domicilioEntity.save(domicilio);

    }

    public ResponseEntity<Domicilio> safeDelete(Long id){
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
