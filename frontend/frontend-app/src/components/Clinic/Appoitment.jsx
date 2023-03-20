import React from "react";
import axios from "axios";

import { BsPencil } from "react-icons/bs";

export const Appoitment = () => {
  let turnos = [
    {
      id: 1,
      patient: {
        lastName: "Gavensky",
        firstName: "Tadeo",
      },
      dentist: {
        lastName: "Cachanosky",
      },
      date: "20/03/2023",
    },
    {
      id: 2,
      patient: {
        lastName: "Chalando",
        firstName: "Rolando",
      },
      dentist: {
        lastName: "Megatone",
      },
      date: "25/03/2023",
    },
    {
      id: 3,
      patient: {
        lastName: "Robertone",
        firstName: "Evaristo",
      },
      dentist: {
        lastName: "Malandro",
      },
      date: "13/04/2023",
    },
    {
      id: 4,
      patient: {
        lastName: "Sheeran",
        firstName: "Ed",
      },
      dentist: {
        lastName: "Edwards",
      },
      date: "31/03/2023",
    },
  ];

  function submitForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form input values
    const patient = document.getElementById("patientForm").value;
    const dentist = document.getElementById("dentistForm").value;
    const date = document.getElementById("dateForm").value;

    // Create the request body
    const requestBody = {
      patient,
      dentist,
      date,
    };

    // Send the request to the API endpoint
    axios
      .post("https://localhost:8000/turnos", requestBody)
      .then((response) => {
        if (response.status === 200) {
          // Show a success message to the user
          alert("Turno guardado correctamente");

          // Reset the form
          document.getElementById("patientForm").value = "";
          document.getElementById("dentistForm").value = "";
          document.getElementById("dateForm").value = "";
        } else {
          // Show an error message to the user
          alert("Error al guardar el turno");
        }
      })
      .catch((error) => {
        // Show an error message to the user
        alert("Error al guardar el turno");
      });
  }

  const showForm = () => {
    let form = document.getElementById("form-appointment-container");
    form.style.display = "flex";
  };

  const hideForm = () => {
    let form = document.getElementById("form-appointment-container");
    form.style.display = "none";
 
  };

  let patients = [
    { firstName: "Juan", lastName: "Pérez" },
    { firstName: "María", lastName: "García" },
    { firstName: "Pedro", lastName: "Martínez" },
    { firstName: "Lucía", lastName: "Hernández" },
    { firstName: "Luis", lastName: "González" },
  ];

  let dentists = [
    { firstName: "Alejandro", lastName: "García" },
    { firstName: "Luciana", lastName: "Pérez" },
    { firstName: "Marcelo", lastName: "Fernández" },
    { firstName: "Laura", lastName: "González" },
    { firstName: "Diego", lastName: "Rodríguez" },
  ];

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
        className="hidden fixed inset-0 items-center justify-center backdrop-blur-md bg-opacity-75 "
        style={{ marginTop: "0" }}
      >
        <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium mb-4">New appointment</h2>
          <form
            className="space-y-4"
            onSubmit={() => {
              submitForm();
            }}
          >
            <div className="flex flex-col">
              <label className="mb-1 font-medium" for="patient">
                Patient
              </label>
              <select
                id="patient"
                name="patient"
                className="rounded-lg border-gray-400 border-solid border py-2 px-3"
              >
                <option value="">Select patient</option>
                {patients.map((patient) => {
                  return (
                    <option selected value={patient.lastName}>
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
              >
                <option selected value="">
                  Seleccionar dentist
                </option>
                {dentists.map((dentist) => {
                  return (
                    <option selected value={dentist.lastName}>
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
                type="date"
                className="rounded-lg border-gray-400 border-solid border py-2 px-3"
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
                Cancel
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
                <th className="py-3 px-4">Edit</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {turnos.map((turno) => {
                return (
                  <tr className="border-b border-gray-200 hover:bg-gray-100 px-12">
                    <td className="py-3 px-5 text-left">{turno.id}</td>
                    <td className="py-3 px-4 text-left">
                      {turno.patient.lastName}, {turno.patient.firstName}
                    </td>
                    <td className="py-3 px-4 text-left">
                      Dr. {turno.dentist.lastName}
                    </td>
                    <td className="py-3 px-4 text-left">{turno.date}</td>
                    <td className="flex justify-center items-center align-middle">
                      <td className="flex justify-center items-center align-middle mt-1">
                        <button
                          type="button"
                          class="inline-block rounded bg-orange-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-orange-500-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
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
