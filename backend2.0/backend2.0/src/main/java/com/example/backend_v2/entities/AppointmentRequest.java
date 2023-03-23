package com.example.backend_v2.entities;

public class AppointmentRequest {
    private Appointment appointment;
    private String dateString;


    public AppointmentRequest() {
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public String getDateString() {
        return dateString;
    }

    public void setDateString(String dateString) {
        this.dateString = dateString;
    }

    @Override
    public String toString() {
        return "AppointmentRequest{" +
                "appointment=" + appointment +
                ", dateString='" + dateString + '\'' +
                '}';
    }
}