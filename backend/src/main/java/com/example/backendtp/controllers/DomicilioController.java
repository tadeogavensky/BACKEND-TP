package com.example.backendtp.controllers;

import com.example.backendtp.entities.DomicilioEntity;
import com.example.backendtp.models.Domicilio;
import com.example.backendtp.models.Paciente;
import com.example.backendtp.service.DomicilioService;
import com.example.backendtp.service.PacienteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping(path = "api/v1/domicilio")
public class DomicilioController {

    DomicilioService domicilioService = new DomicilioService();

    private final Logger log = LoggerFactory.getLogger(DomicilioController.class);


    @PostMapping()
    public String create(@RequestBody Domicilio domicilio, @RequestHeader HttpHeaders headers) {
        domicilioService.save(domicilio);
        return "redirect:/savesuccess-page";
    }

    @GetMapping("/updateDomicilioForm")
    public String showUpdateDomicilioForm(Model model) {
        model.addAttribute("Domicilio", new Domicilio());
        return "updateDomicilioForm";
    }

    @PutMapping(path = "/{id}")
    public String update(@RequestBody Domicilio domicilio) {
        domicilioService.update(domicilio);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Domicilio> safeDelete(@PathVariable Long id){
        return domicilioService.safeDelete(id);
    }
}
