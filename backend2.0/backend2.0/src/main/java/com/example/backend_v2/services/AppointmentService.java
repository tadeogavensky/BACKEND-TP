package com.example.backend_v2.services;

import com.example.backend_v2.entities.Appointment;
import com.example.backend_v2.entities.Dentist;
import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.repositories.AppointmentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public void AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    private final Logger log = LoggerFactory.getLogger(AppointmentService.class);

    public List<Appointment> findAll(){
        List<Appointment> appointments = appointmentRepository.findAll();
        return  appointments;
    }

    public Optional<Appointment> findById(Long id){
        Optional<Appointment> appointment =  appointmentRepository.findById(id);
        return appointment;
    }

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment update( Appointment appointment) {

        if(!appointmentRepository.existsById(appointment.getId())){
            log.warn("Appointment does not exists!");
        }
        return appointmentRepository.save(appointment);

    }

    public Dentist getDentistForAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + appointmentId));
        return appointment.getDentist();
    }

    public Patient getPatientForAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + appointmentId));
        return appointment.getPatient();
    }

    public List<Appointment> getAppointmentsForPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsForDentist(Long dentistId) {
        return appointmentRepository.findByDentistId(dentistId);
    }


}
