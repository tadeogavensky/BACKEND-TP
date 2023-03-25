import React, { useEffect, useState } from "react";
import axios from "axios";

import { BsPencil } from "react-icons/bs";
import Swal from "sweetalert2";

export const Appoitment = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [dentists, setDentists] = useState([]);

  const [dentist, setSelectedDentist] = useState({});
  const [patient, setSelectedPatient] = useState({});
  const [dateString, setSelectedDateTime] = useState();
  const [appointmentBody, setAppointmentBody] = useState({});





  const handleSelectDentist = (event) => {
    /*  console.log("handleSelectDentist :>> ", JSON.parse(event.target.value)); */
    setSelectedDentist(JSON.parse(event.target.value));
  };

  const handleSelectPatient = (event) => {
    setSelectedPatient(JSON.parse(event.target.value));
  };

  const handleSelectDate = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const fetchPatients = () => {
    axios
      .get("http://localhost:9000/api/v1/patient/findAll")
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
      .get("http://localhost:9000/api/v1/dentist/findAll")
      .then((res) => {
        let json = JSON.stringify(res);
        let data = JSON.parse(json);
        setDentists(data.data);
        /*     console.log('dentists :>> ', dentists); */
      })
      .catch((error) => {
        console.error(error.data.config.data);
      });
  };

  const fetchAppointments = () => {
    axios
      .get("http://localhost:9000/api/v1/appointment/findAll")
      .then((res) => {
        let json = JSON.stringify(res);
        let data = JSON.parse(json);
        data.data.forEach((appointment) => {
          const date = new Date(
            appointment.dateTime[0],
            appointment.dateTime[1] - 1,
            appointment.dateTime[2],
            appointment.dateTime[3],
            appointment.dateTime[4]
          );
          appointment.dateTime = date.toLocaleString();
        });
        setAppointments(data.data);
      })
      .catch((error) => {
        /*  console.error(error.data.config); */
      });
  };

  useEffect(() => {
    fetchDentists();
    fetchPatients();
    fetchAppointments();
  }, []);

  const saveAppointment = (event) => {
    setAppointmentBody({
      patient,
      dentist,
      dateString,
      assisted: false,
    });

    const payload = {
      appointment: {
        dentist: dentist,
        patient: patient,
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
    console.log(dateString);

    if (!patient) {
      Toast.fire({
        icon: "error",
        title: "Please select a patient",
      });
    } else if (!dentist) {
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
        .post("http://localhost:9000/api/v1/appointment/", payload)
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

  const showForm = () => {
    let form = document.getElementById("form-appointment-container");
    form.style.display = "flex";
  };

  const hideForm = () => {
    let form = document.getElementById("form-appointment-container");
    form.style.display = "none";
  };

  return (
    <div className=" flex flex-col justify-center space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Latest appoitnments</h1>
        <button
          onClick={() => {
            showForm();
          }}
          className="inline-block rounded bg-blue-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
        >
          NEW APPOINTMENT
        </button>
      </div>

      <div
        id="form-appointment-container"
        className="hidden fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-75 "
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
              <label className="mb-1 font-medium" for="patient">
                Patient
              </label>
              <select
                id="patient"
                name="patient"
                className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                value={patient}
                onChange={handleSelectPatient}
                onBlur={handleSelectPatient}
                onFocus={handleSelectPatient}
              >
                <option value={patient} defaultValue={patient}>
                  Select patient
                </option>
                ;
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
              <label className="mb-1 font-medium" for="dentist">
                Dentist
              </label>
              <select
                id="dentist"
                name="dentist"
                className="rounded-lg border-gray-400 border-solid border py-2 px-4"
                value={dentist}
                onChange={handleSelectDentist}
                onBlur={handleSelectDentist}
                onFocus={handleSelectDentist}
              >
                <option value="" defaultValue>
                  Select dentist
                </option>

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
              <label className="mb-1 font-medium" for="date">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="datetime-local"
                className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                value={dateString}
                onSubmit={handleSelectDate}
                onChange={handleSelectDate}
                onBlur={handleSelectDate}
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
                  hideForm();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

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
              {appointments.map((appointment) => {
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
                      {appointment.dateTime}
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
