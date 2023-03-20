import axios from "axios";
import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";

const PatientTable = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      dni: "12345678",
      address: {
        street: "Main St",
        number: "123",
        city: "Anytown",
        state: "CA",
        zip: "12345",
      },
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      dni: "87654321",
      address: {
        street: "Oak Ave",
        number: "456",
        city: "Anytown",
        state: "CA",
        zip: "54321",
      },
    },
  ]);

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
    let form = document.getElementById("form-patient-container");
    form.style.display = "flex";
  };

  const hideForm = () => {
    let form = document.getElementById("form-patient-container");
    form.style.display = "none";
  };

  return (
    <div className="w-full">
      <div className=" my-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg">Patients</h1>
          <button
            onClick={() => {
              showForm();
            }}
            className="inline-block rounded bg-blue-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
          >
            NEW PATIENT
          </button>
        </div>

        <div
          id="form-patient-container"
          className="hidden fixed inset-0 items-center justify-center backdrop-blur-md bg-opacity-75 "
          style={{ marginTop: "0" }}
        >
          <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-4">New patient</h2>
            <form
              className="space-y-4"
              onSubmit={() => {
                submitForm();
              }}
            >
              <div className="flex flex-col">
                <label className="mb-1 font-medium" for="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium" for="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium" for="date">
                  DNI
                </label>
                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="street">
                  Address
                </label>
                <div className="flex flex-wrap space-x-3">
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="street">
                      Street
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="number">
                      Number
                    </label>
                    <input
                      id="number"
                      name="number"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="zipCode">
                      Zip Code
                    </label>
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="state">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    />
                  </div>
                </div>
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

        <table className="w-full table-auto shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Last name</th>
              <th className="py-3 px-4 text-left">First name</th>
              <th className="py-3 px-4 text-left">DNI</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4">Edit</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {patients.map((patient) => {
              return (
                <tr className="border-b border-gray-200 hover:bg-gray-100 px-12">
                  <td className="py-3 px-5 text-left">{patient.id}</td>
                  <td className="py-3 px-4 text-left">{patient.lastName}</td>
                  <td className="py-3 px-4 text-left">{patient.firstName}</td>
                  <td className="py-3 px-4 text-left">{patient.dni}</td>
                  <td className="py-3 px-4 text-left">
                    {patient.address.street}, {patient.address.number},{" "}
                    {patient.address.city}, {patient.address.zip},{" "}
                    {patient.address.state}
                  </td>
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
  );
};

export default PatientTable;
