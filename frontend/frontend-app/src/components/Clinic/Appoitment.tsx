import React, { useEffect, useState } from "react";
import axios from "axios";

import { BsPencil } from "react-icons/bs";
import Swal from "sweetalert2";
import { Patient } from "@/types/Patient";
import { Dentist } from "@/types/Dentist";
import { Appointment } from "@/types/Appointment";

export const Appoitment = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);


  

  const [appointment, setAppointment] = useState<Appointment>({
  id: 0,
  dentist: {} as Dentist,
  patient: {} as Patient,
  dateTime: "",
  assisted: false,
});


  const [dateString, setSelectedDateTime] = useState();


  function handleAppointmentChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    const { patient, dentist } = appointment;
  
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
      patient: {
        ...patient,
        [name]: value,
      },
      dentist: {
        ...dentist,
        [name]: value,
      },
    }));
  }
  

  
  const updateField = (
    field: keyof Dentist | keyof Patient | keyof Appointment,
    value: number | string
  ) => {
    if (field in appointment) {
      setAppointment({
        ...appointment,
      });
    }
  };

  const fetchPatients = () => {
    axios
      .get("http://localhost:9010/api/v1/patient/findAll")
      .then((res) => {
        let json = JSON.stringify(res);
        let data = JSON.parse(json);
        setPatients(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchDentists = () => {
    axios
      .get("http://localhost:9010/api/v1/dentist/findAll")
      .then((res) => {
        let json = JSON.stringify(res);
        let data = JSON.parse(json);
        setDentists(data.data);
      })
      .catch((error) => {
        console.error(error.data.config.data);
      });
  };

  const fetchAppointments = (): void => {
    axios
      .get<{ data: Appointment[] }>(
        "http://localhost:9010/api/v1/appointment/findAll"
      )
      .then((res) => {
        console.log('res :>> ', res.data);
        setAppointments(res.data.data);
      })
      .catch((error) => {
        /*  console.error(error.config); */
      });
  };

  useEffect(() => {
    fetchDentists();
    fetchPatients();
    fetchAppointments();
  }, []);

  const saveAppointment = (event: { preventDefault: () => void }) => {
    console.log("appointment :>> ", appointment);

    const payload = {
      appointment: {
        dentist: JSON.stringify(appointment.dentist),
        patient: JSON.stringify(appointment.patient),
      },
      dateString,
      deleted: false,
    };

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    event.preventDefault();

    console.log(payload);

    if (!appointment.patient) {
      Toast.fire({
        icon: "error",
        title: "Please select a patient",
      });
    } else if (!appointment.dentist) {
      Toast.fire({
        icon: "error",
        title: "Please select a dentist",
      });
    } else if (dateString == "") {
      Toast.fire({
        icon: "error",
        title: "Please select a date",
      });
    } else {
      axios
        .post("http://localhost:9010/api/v1/appointment/", payload)
        .then((res) => {
          if (res.status === 200) {
            Toast.fire({
              icon: "success",
              title: "Appointment created successfully",
            });
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
          Toast.fire({
            icon: "error",
            title: error.response.data,
          });
        });
    }
  };

  return (
    <div className=" flex flex-col justify-center space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Latest appoitnments</h1>
        <button
          onClick={() => {
            setShowForm(true);
            console.log("setForm :>> ", showForm);
          }}
          className="inline-block rounded bg-blue-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
        >
          NEW APPOINTMENT
        </button>
      </div>

      {showForm && (
        <div
          id="form-appointment-container"
          className="flex fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-75 "
          style={{ marginTop: "0" }}
        >
          <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-4">New appointment</h2>
            <form
              className="space-y-4"
              onSubmit={saveAppointment}
              id="appointmentForm"
            >
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Patient</label>
                <select
                  id="patient"
                  name="patient"
                  className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                  value={JSON.stringify(appointment.patient)}
                  onChange={(event) => {
                    setAppointment((prevAppointment) => ({
                      ...prevAppointment,
                      patient: {
                        ...prevAppointment.patient,
                        patient: event.target.value,
                      },
                    }));
                  }}
                >
                  <option value="">Select patient</option>
                  {patients.map((patient) => {
                    return (
                      <option value={JSON.stringify(patient)}>
                        {patient.lastName}, {patient.firstName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Dentist</label>
                <select
                  id="dentist"
                  name="dentist"
                  className="rounded-lg border-gray-400 border-solid border py-2 px-4"
                  value={JSON.stringify(appointment.dentist)}
                  onChange={(event) => {
                    setAppointment((prevAppointment) => ({
                      ...prevAppointment,
                      dentist: {
                        ...prevAppointment.dentist,
                        dentist: event.target.value,
                      },
                    }));
                  }}
                >
                  <option value="">Select dentist</option>

                  {dentists.map((dentist) => {
                    return (
                      <option value={JSON.stringify(dentist)}>
                        Dr. {dentist.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date</label>
                <input
                  id="date"
                  name="date"
                  type="datetime-local"
                  className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                  value={appointment.dateTime}
                  onChange={(event) =>
                    setAppointment({
                      ...appointment,
                      dateTime: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 w-full"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg py-2 px-4"
                  onClick={() => {
                    setShowForm(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="bg-white shadow-md rounded my-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Patient</th>
                <th className="py-3 px-4 text-left">Dentist</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Assisted</th>
                <th className="py-3 px-4">Edit</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {appointments?.map((appointment) => {
                return (
                  <tr className="border-b border-gray-200 hover:bg-gray-100 px-12">
                    <td className="py-3 px-5 text-left">{appointment.id}</td>
                    <td className="py-3 px-4 text-left">
                      {appointment.patient.lastName},{" "}
                      {appointment.patient.firstName}
                    </td>
                    <td className="py-3 px-4 text-left">
                      Dr. {appointment.dentist.lastName}
                    </td>
                    <td className="py-3 px-4 text-left">
                      {appointment.dateTime.toString()}
                    </td>
                    <td className="py-3 px-4 text-left">
                      {appointment.assisted ? "YES" : "NO"}
                    </td>

                    <td className="flex justify-center items-center align-middle">
                      <td className="flex justify-center items-center align-middle mt-1">
                        <button
                          type="button"
                          className="inline-block rounded bg-orange-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-orange-500-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
                        >
                          <BsPencil />
                        </button>
                      </td>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
