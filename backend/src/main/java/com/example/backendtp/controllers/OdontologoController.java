package com.example.backendtp.controllers;

import com.example.backendtp.entities.OdontologoEntity;
import com.example.backendtp.models.Odontologo;
import com.example.backendtp.models.Paciente;
import com.example.backendtp.service.OdontologoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "api/v1/odontologo")
public class OdontologoController {





    OdontologoService odontologoService = new OdontologoService();

    @GetMapping(path = "/buscarTodos")
    public List<Odontologo> findAll() {
          return odontologoService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Odontologo> findById(@PathVariable("id") Long id) {
     return odontologoService.findById(id);
    }

    @GetMapping("/newOdontologoForm")
    public String showNewPacienteForm(Model model) {
        model.addAttribute("Odontologo", new Odontologo());
        return "newOdontologoForm";
    }

    @PostMapping()
    public String save(@ModelAttribute Odontologo odontologo, @RequestHeader HttpHeaders headers) {
        odontologoService.save(odontologo);
        return "redirect:/savesuccess-page";
    }

    @GetMapping("/updateOdontologoForm")
    public String showUpdateOdontologoForm(Model model) {
        model.addAttribute("Odontologo", new Odontologo());
        return "updateOdontologoForm";
    }

    @PutMapping(path = "/{id}")
    public String update(@ModelAttribute("odontologo") Odontologo odontologo) {
        odontologoService.update(odontologo);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Odontologo> safeDelete(@PathVariable Long id){
       return odontologoService.safeDelete(id);
    }
}
