package com.example.backend_v2.services;



import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.repositories.DentistRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class DentistService {
    private DentistRepository dentistRepository;

    public void DentistController(DentistRepository dentistRepository) {
        this.dentistRepository = dentistRepository;
    }
    private final Logger log = LoggerFactory.getLogger(DentistService.class);

    public List<Dentist> findAll(){
        return  dentistRepository.findAll();
    }

    public ResponseEntity<Dentist> findById(Long id){
        Optional<Dentist> OptDentist =  dentistRepository.findById(id);
        return OptDentist.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Dentist save(Dentist dentist) {
        return dentistRepository.save(dentist);
    }

    public Dentist update( Dentist dentist) {

        if(!dentistRepository.existsById(dentist.getId())){
            log.warn("Dentist no existe!");
        }
        return dentistRepository.save(dentist);

    }

    public ResponseEntity<Dentist> safeDelete(Long id){
        if(!dentistRepository.existsById(id)){
            log.warn("El dentist no existe!");
            return ResponseEntity.notFound().build();
        }
        Optional<Dentist> OptDentist = dentistRepository.findById(id);
        if (OptDentist.isPresent()){
            Dentist dentist = OptDentist.get();
            /*   dentist.setDeleted(true);*/
            dentistRepository.save(dentist);
        }
        return ResponseEntity.noContent().build();
    }


}
