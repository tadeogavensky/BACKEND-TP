package com.example.backendtp.controllers;

import com.example.backendtp.entities.DomicilioEntity;
import com.example.backendtp.entities.PacienteEntity;
import com.example.backendtp.models.Domicilio;
import com.example.backendtp.models.Paciente;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/paciente")
public class PacienteController {

    private final PacienteEntity pacienteEntity;

    private final Logger log = LoggerFactory.getLogger(PacienteController.class);


    public PacienteController(PacienteEntity pacienteEntity) {
        this.pacienteEntity = pacienteEntity;
    }

    @GetMapping(path = "/buscarTodos")
    public List<Paciente> findAll() {
        return pacienteEntity.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Paciente> findById(@PathVariable("id") Long id) {
        Optional<Paciente> OptPaciente =  pacienteEntity.findById(id);
        return OptPaciente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }


    @GetMapping("/newPacienteForm")
    public String showNewPacienteForm(Model model) {
        model.addAttribute("Paciente", new Paciente());
        return "newPacienteForm";
    }

    @PostMapping()
    public String create(@ModelAttribute("paciente") Paciente paciente, @RequestHeader HttpHeaders headers) {
         pacienteEntity.save(paciente);
        return "redirect:/newsuccess-page";
    }


    @GetMapping("/updatePacienteForm")
    public String showUpdatePacienteForm(Model model) {
        model.addAttribute("Paciente", new Paciente());
        return "updatePacienteForm";
    }
    @PutMapping(path = "/{id}")
    public String update(@ModelAttribute("paciente") Paciente paciente) {

        if(!pacienteEntity.existsById(paciente.getId())){
            log.warn("Paciente no existe!");
        }
        Paciente result =pacienteEntity.save(paciente);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public String safeDelete(@PathVariable Long id){
        if(!pacienteEntity.existsById(id)){
            log.warn("El paciente no existe!");
        }
        Optional<Paciente> OptPaciente = pacienteEntity.findById(id);
        if (OptPaciente.isPresent()){
            Paciente paciente = OptPaciente.get();
            paciente.setDeleted(true);
            pacienteEntity.save(paciente);
        }
        return "redirect:/deletesuccess-page";
    }
}
