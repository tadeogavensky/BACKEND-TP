package com.example.backend_v2.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.repositories.PatientRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientService patientService;

    private Patient patient;

    @BeforeEach
    public void setUp() {
        patient = new Patient();

        patient.setFirstName("John");
        patient.setLastName("Doe");
        patient.setDni(12345678);
        patient.setDeleted(false);
    }

    @Test
    public void testFindAll() {
        List<Patient> patientList = new ArrayList<>();
        patientList.add(patient);

        when(patientRepository.findAll()).thenReturn(patientList);

        List<Patient> result = patientService.findAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(patient, result.get(0));
    }

    @Test
    public void testFindAllNotDeleted() {
        List<Patient> patientList = new ArrayList<>();
        patientList.add(patient);

        when(patientRepository.findAllNotDeleted()).thenReturn(patientList);

        List<Patient> result = patientService.findAllNotDeleted();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(patient, result.get(0));
    }

    @Test
    public void testFindById() {
        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));

        Optional<Patient> result = patientService.findById(1L);

        assertNotNull(result);
        assertEquals(patient, result.get());
    }

    @Test
    public void testFindByDNI() {
        when(patientRepository.findByDNI(12345678)).thenReturn(patient);

        Patient result = patientService.findByDNI(12345678);

        assertNotNull(result);
        assertEquals(patient, result);
    }

    @Test
    public void testSave() {
        when(patientRepository.save(patient)).thenReturn(patient);

        Patient result = patientService.save(patient);

        assertNotNull(result);
        assertEquals(patient, result);
    }

    @Test
    public void testUpdate() {
        when(patientRepository.save(patient)).thenReturn(patient);

        Patient result = patientService.update(patient);

        assertNotNull(result);
        assertEquals(patient, result);
    }

    @Test
    public void testSafeDelete() {
        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));
        when(patientRepository.save(patient)).thenReturn(patient);

        Patient result = patientService.safeDelete(1L);

        assertNotNull(result);
        assertEquals(patient, result);
        assertEquals(true, patient.isDeleted());
    }
}
