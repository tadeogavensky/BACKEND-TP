package com.example.backendtp.service;

import com.example.backendtp.controllers.OdontologoController;
import com.example.backendtp.entities.OdontologoEntity;
import com.example.backendtp.models.Odontologo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public class OdontologoService {
    private OdontologoEntity odontologoEntity;

    public void OdontologoController(OdontologoEntity odontologoEntity) {
        this.odontologoEntity = odontologoEntity;
    }
    private final Logger log = LoggerFactory.getLogger(OdontologoService.class);

    public List<Odontologo> findAll(){
        return  odontologoEntity.findAll();
    }

    public ResponseEntity<Odontologo> findById(Long id){
        Optional<Odontologo> OptOdontologo =  odontologoEntity.findById(id);
        return OptOdontologo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Odontologo save(Odontologo odontologo) {
       return odontologoEntity.save(odontologo);
    }

    public Odontologo update( Odontologo odontologo) {

        if(!odontologoEntity.existsById(odontologo.getId())){
            log.warn("Odontologo no existe!");
        }
        return odontologoEntity.save(odontologo);

    }

    public ResponseEntity<Odontologo> safeDelete(Long id){
        if(!odontologoEntity.existsById(id)){
            log.warn("El odontologo no existe!");
            return ResponseEntity.notFound().build();
        }
        Optional<Odontologo> OptOdontologo = odontologoEntity.findById(id);
        if (OptOdontologo.isPresent()){
            Odontologo odontologo = OptOdontologo.get();
            odontologo.setDeleted(true);
            odontologoEntity.save(odontologo);
        }
        return ResponseEntity.noContent().build();
    }


}
