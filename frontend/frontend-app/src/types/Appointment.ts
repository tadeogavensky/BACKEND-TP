import { Patient } from "./Patient";
import { Dentist } from "./Dentist";

export interface Appointment {
  id?: number;
  dentist: Dentist;
  patient: Patient;
  dateTime: Date;
  assisted: boolean;
}