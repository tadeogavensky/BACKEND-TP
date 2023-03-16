package com.example.backendtp.controllers;

import com.example.backendtp.entities.TurnoEntity;
import com.example.backendtp.models.Turno;
import com.example.backendtp.service.OdontologoService;
import com.example.backendtp.service.PacienteService;
import com.example.backendtp.service.TurnoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class TurnoController {
    private TurnoService turnoService = new TurnoService();
    private PacienteService pacienteService = new PacienteService();
    private OdontologoService odontologoService = new OdontologoService();

    @PostMapping
    public ResponseEntity<Turno> newAppoitment(@RequestBody Turno turno) {
        ResponseEntity<Turno> response;
        if (pacienteService.findById(turno.getPaciente().getId()) != null && odontologoService.findById(turno.getOdontologo().getId()) != null)
            response = ResponseEntity.ok(turnoService.newAppoitment(turno));
        else
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return response;


        }


    @GetMapping
    public ResponseEntity<List<Turno>> listAll() {
        return ResponseEntity.ok(turnoService.listAll());
    }
}
