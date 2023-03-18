package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.services.DentistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "api/v1/dentist")
public class DentistController {
    @Autowired
    DentistService dentistService;

    @GetMapping(path = "/findAll")
    public List<Dentist> findAll() {
        return dentistService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Dentist> findById(@PathVariable("id") Long id) {
        return dentistService.findById(id);
    }

    @GetMapping("/newDentistForm")
    public String showNewPacienteForm(Model model) {
        model.addAttribute("Dentist", new Dentist());
        return "newDentistForm";
    }

    @PostMapping()
    public String save(@ModelAttribute Dentist dentist, @RequestHeader HttpHeaders headers) {
        dentistService.save(dentist);
        return "redirect:/savesuccess-page";
    }

    @GetMapping("/updateDentistForm")
    public String showUpdateDentistForm(Model model) {
        model.addAttribute("Dentist", new Dentist());
        return "updateDentistForm";
    }

    @PutMapping(path = "/{id}")
    public String update(@ModelAttribute("dentist") Dentist dentist) {
        dentistService.update(dentist);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Dentist> safeDelete(@PathVariable Long id){
        return dentistService.safeDelete(id);
    }
}
