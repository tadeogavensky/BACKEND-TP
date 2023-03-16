package com.example.backendtp.controllers;

import com.example.backendtp.models.Paciente;
import com.example.backendtp.service.PacienteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(path = "api/v1/paciente")
public class PacienteController {

    PacienteService pacienteService = new PacienteService();

    private final Logger log = LoggerFactory.getLogger(PacienteController.class);



    @GetMapping(path = "/buscarTodos")
    public List<Paciente> findAll() {
        return pacienteService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Paciente> findById(@PathVariable("id") Long id) {
        return pacienteService.findById(id);
    }


    @GetMapping("/newPacienteForm")
    public String showNewPacienteForm(Model model) {
        model.addAttribute("Paciente", new Paciente());
        return "newPacienteForm";
    }

    @PostMapping()
    public String create(@ModelAttribute("paciente") Paciente paciente, @RequestHeader HttpHeaders headers) {
        pacienteService.save(paciente);
        return "redirect:/savesuccess-page";

    }


    @GetMapping("/updatePacienteForm")
    public String showUpdatePacienteForm(Model model) {
        model.addAttribute("Paciente", new Paciente());
        return "updatePacienteForm";
    }
    @PutMapping(path = "/{id}")
    public String update(@ModelAttribute("paciente") Paciente paciente) {

        pacienteService.update(paciente);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Paciente> safeDelete(@PathVariable Long id){
       return pacienteService.safeDelete(id);
    }
}
