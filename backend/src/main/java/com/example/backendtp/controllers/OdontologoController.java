package com.example.backendtp.controllers;

import com.example.backendtp.entities.OdontologoEntity;
import com.example.backendtp.models.Odontologo;
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
@RequestMapping(path = "api/v1/odontologo")
public class OdontologoController {

    private final OdontologoEntity odontologoEntity;

    private final Logger log = LoggerFactory.getLogger(OdontologoController.class);
    

    public OdontologoController(OdontologoEntity odontologoEntity) {
        this.odontologoEntity = odontologoEntity;
    }

    @GetMapping(path = "/buscarTodos")
    public List<Odontologo> findAll() {
        return odontologoEntity.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Odontologo> findById(@PathVariable("id") Long id) {
        Optional<Odontologo> OptPaciente =  odontologoEntity.findById(id);
        return OptPaciente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }

    @GetMapping("/newOdontologoForm")
    public String showNewPacienteForm(Model model) {
        model.addAttribute("Odontologo", new Odontologo());
        return "newOdontologoForm";
    }

    @PostMapping()
    public String create(@ModelAttribute("odontologo") Odontologo odontologo, @RequestHeader HttpHeaders headers) {
         odontologoEntity.save(odontologo);
        return "redirect:/newsuccess-page";
    }

    @GetMapping("/updateOdontologoForm")
    public String showUpdateOdontologoForm(Model model) {
        model.addAttribute("Odontologo", new Odontologo());
        return "updateOdontologoForm";
    }

    @PutMapping(path = "/{id}")
    public String update(@ModelAttribute("odontologo") Odontologo odontologo) {

        if(!odontologoEntity.existsById(odontologo.getId())){
            log.warn("Odontologo no existe!");
        }
        Odontologo result =odontologoEntity.save(odontologo);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Odontologo> safeDelete(@PathVariable Long id){
        if(!odontologoEntity.existsById(id)){
            log.warn("El paciente no existe!");
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
