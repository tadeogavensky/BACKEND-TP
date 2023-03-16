package com.example.backendtp.service;

import com.example.backendtp.entities.PacienteEntity;
import com.example.backendtp.entities.PacienteEntity;
import com.example.backendtp.models.Paciente;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public class PacienteService {

    private PacienteEntity pacienteEntity;

    public void PacienteController(PacienteEntity pacienteEntity) {
        this.pacienteEntity = pacienteEntity;
    }
    private final Logger log = LoggerFactory.getLogger(PacienteService.class);

    public List<Paciente> findAll(){
        return  pacienteEntity.findAll();
    }

    public ResponseEntity<Paciente> findById(Long id){
        Optional<Paciente> OptPaciente =  pacienteEntity.findById(id);
        return OptPaciente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Paciente save(Paciente paciente) {
        return pacienteEntity.save(paciente);
    }

    public Paciente update( Paciente paciente) {

        if(!pacienteEntity.existsById(paciente.getId())){
            log.warn("Paciente no existe!");
        }
        return pacienteEntity.save(paciente);

    }

    public ResponseEntity<Paciente> safeDelete(Long id){
        if(!pacienteEntity.existsById(id)){
            log.warn("El paciente no existe!");
            return ResponseEntity.notFound().build();
        }
        Optional<Paciente> OptPaciente = pacienteEntity.findById(id);
        if (OptPaciente.isPresent()){
            Paciente paciente = OptPaciente.get();
            paciente.setDeleted(true);
            pacienteEntity.save(paciente);
        }
        return ResponseEntity.noContent().build();
    }

}
