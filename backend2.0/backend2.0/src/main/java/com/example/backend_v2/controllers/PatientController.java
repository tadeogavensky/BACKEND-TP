package com.example.backend_v2.controllers;

import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.services.PatientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(path = "api/v1/patient")
public class PatientController {
    @Autowired
    PatientService patientService;

    private final Logger log = LoggerFactory.getLogger(PatientController.class);



    @GetMapping(path = "/findAll")
    public List<Patient> findAll() {
        return patientService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Patient> findById(@PathVariable("id") Long id) {
        return patientService.findById(id);
    }


    @GetMapping("/newPatientForm")
    public String showNewPatientForm(Model model) {
        model.addAttribute("Patient", new Patient());
        return "newPatientForm";
    }

    @PostMapping()
    public String create(@ModelAttribute("patient") Patient patient, @RequestHeader HttpHeaders headers) {
        patientService.save(patient);
        return "redirect:/savesuccess-page";

    }


    @GetMapping("/updatePatientForm")
    public String showUpdatePatientForm(Model model) {
        model.addAttribute("Patient", new Patient());
        return "updatePatientForm";
    }
    @PutMapping(path = "/{id}")
    public String update(@ModelAttribute("patient") Patient patient) {

        patientService.update(patient);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Patient> safeDelete(@PathVariable Long id){
        return patientService.safeDelete(id);
    }
}
