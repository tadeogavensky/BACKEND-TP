package com.example.backendtp.service;

import com.example.backendtp.entities.OdontologoEntity;
import com.example.backendtp.entities.TurnoEntity;
import com.example.backendtp.models.Turno;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class TurnoService {

    private TurnoEntity turnoEntity;

    public void TurnoController(TurnoEntity turnoEntity) {
        this.turnoEntity = turnoEntity;
    }

    public Turno newAppoitment(Turno turno){
       return turnoEntity.save(turno);
    }

    public List<Turno> listAll(){
        return turnoEntity.findAll();
    }
}
