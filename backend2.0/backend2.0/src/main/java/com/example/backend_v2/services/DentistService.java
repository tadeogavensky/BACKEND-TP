package com.example.backend_v2.services;



import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.repositories.DentistRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class DentistService {
    @Autowired
    private DentistRepository dentistRepository;

    public void DentistController(DentistRepository dentistRepository) {
        this.dentistRepository = dentistRepository;
    }
    private final Logger log = LoggerFactory.getLogger(DentistService.class);

    public List<Dentist> findAll(){
        return  dentistRepository.findAll();
    }

    public List<Dentist> findAllNotDeleted(){

        return dentistRepository.findAllNotDeleted();
    }

    public Optional<Dentist> findById(Long id){
        return dentistRepository.findById(id);
    }


    public Dentist findByRegistrationNumber(int rn){
        return dentistRepository.findByRegistrationNumber(rn);
    }

    public Dentist findByDentist(String firstName, String lastName){
        return dentistRepository.findByDentist(firstName,lastName);
    }

    public Dentist save(Dentist dentist) {
        return dentistRepository.save(dentist);
    }

    public Dentist update( Dentist dentist) {

        if(!dentistRepository.existsById(dentist.getId())){
            log.warn("Dentist does not exists!");
        }
        return dentistRepository.save(dentist);

    }



    public Dentist safeDelete(Long id){
        Optional<Dentist> optionalDentist = dentistRepository.findById(id);
        if (optionalDentist.isPresent()) {
            Dentist dentist = optionalDentist.get();
            dentist.setDeleted(true);
            System.out.println(dentist);
            return dentistRepository.save(dentist);
        } else {
            return null;
        }
    }
}
