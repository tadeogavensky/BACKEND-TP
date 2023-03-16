import React from "react";
import axios from "axios";

import { BsPencil } from "react-icons/bs";

export const Appoitment = () => {
  let turnos = [
    {
      id: 1,
      paciente: {
        apellido: "Gavensky",
        nombre: "Tadeo",
      },
      odontologo: {
        apellido: "Cachanosky",
      },
      fecha: "20/03/2023",
    },
    {
      id: 2,
      paciente: {
        apellido: "Chalando",
        nombre: "Rolando",
      },
      odontologo: {
        apellido: "Megatone",
      },
      fecha: "25/03/2023",
    },
    {
      id: 3,
      paciente: {
        apellido: "Robertone",
        nombre: "Evaristo",
      },
      odontologo: {
        apellido: "Malandro",
      },
      fecha: "13/04/2023",
    },
    {
      id: 4,
      paciente: {
        apellido: "Sheeran",
        nombre: "Ed",
      },
      odontologo: {
        apellido: "Edwards",
      },
      fecha: "31/03/2023",
    },
  ];


function submitForm(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form input values
  const paciente = document.getElementById('pacienteForm').value;
  const odontologo = document.getElementById('odontologoForm').value;
  const fecha = document.getElementById('fechaForm').value;

  // Create the request body
  const requestBody = {
    paciente,
    odontologo,
    fecha
  };

  // Send the request to the API endpoint
  axios.post('https://localhost:8000/turnos', requestBody)
  .then(response => {
    if (response.status === 200) {
      // Show a success message to the user
      alert('Turno guardado correctamente');
      
      // Reset the form
      document.getElementById('pacienteForm').value = '';
      document.getElementById('odontologoForm').value = '';
      document.getElementById('fechaForm').value = '';
    } else {
      // Show an error message to the user
      alert('Error al guardar el turno');
    }
  })
  .catch(error => {
    // Show an error message to the user
    alert('Error al guardar el turno');
  });
}

  const showForm = () => {
    let form = document.getElementById("form-container");
    form.style.display = "flex";
  };

  const hideForm = () => {
    let form = document.getElementById("form-container");
    form.style.display = "none";
    window.location.href = "http://localhost:3000/";

  };

  let pacientes = [
    { nombre: "Juan", apellido: "Pérez" },
    { nombre: "María", apellido: "García" },
    { nombre: "Pedro", apellido: "Martínez" },
    { nombre: "Lucía", apellido: "Hernández" },
    { nombre: "Luis", apellido: "González" }
  ];

  let odontologos = [
    { nombre: "Alejandro", apellido: "García" },
    { nombre: "Luciana", apellido: "Pérez" },
    { nombre: "Marcelo", apellido: "Fernández" },
    { nombre: "Laura", apellido: "González" },
    { nombre: "Diego", apellido: "Rodríguez" }
  ];

  return (
    <div className=" flex flex-col justify-center m-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Últimos turnos</h1>
        <button
          onClick={() => {
            showForm();
          }}
          className="inline-block rounded bg-blue-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
        >
          NUEVO TURNO
        </button>
      </div>

      <div
        id="form-container"
        className="hidden fixed inset-0 items-center justify-center backdrop-blur-md bg-opacity-75 "
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium mb-4">Nuevo turno</h2>
          <form className="space-y-4" onSubmit={()=>{submitForm()}}>
            <div className="flex flex-col">
              <label className="mb-1 font-medium" for="paciente">
                Paciente
              </label>
              <select
                id="paciente"
                name="paciente"
                className="rounded-lg border-gray-400 border-solid border py-2 px-3"
              >
                <option value="">Seleccionar paciente</option>
                {
                pacientes.map(paciente =>{
                    return(
                    <option selected value={paciente.apellido}>{paciente.apellido}, {paciente.nombre}</option>
                    )
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium" for="odontologo">
                Odontólogo
              </label>
              <select
                id="odontologo"
                name="odontologo"
                className="rounded-lg border-gray-400 border-solid border py-2 px-4"
              >
                <option selected value="">Seleccionar odontólogo</option>
                {
                odontologos.map(odontologo =>{
                    return(
                    <option selected value={odontologo.apellido}>Dr/a. {odontologo.apellido}</option>
                    )
                })}

              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium" for="fecha">
                Fecha
              </label>
              <input
                id="fecha"
                name="fecha"
                type="date"
                className="rounded-lg border-gray-400 border-solid border py-2 px-3"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4"
              >
                Guardar
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg py-2 px-4"
                onClick={() => {
                  hideForm();
                }}
              >
                Cancelar
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
                <th className="py-3 px-4 text-left">Paciente</th>
                <th className="py-3 px-4 text-left">Odontólogo</th>
                <th className="py-3 px-4 text-left">Fecha</th>
                <th className="py-3 px-4">Editar</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {turnos.map((turno) => {
                return (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-5 text-left">{turno.id}</td>
                    <td className="py-3 px-4 text-left">
                      {turno.paciente.apellido}, {turno.paciente.nombre}
                    </td>
                    <td className="py-3 px-4 text-left">
                      Dr/a. {turno.odontologo.apellido}
                    </td>
                    <td className="py-3 px-4 text-left">{turno.fecha}</td>
                    <td className="flex justify-center items-center align-middle">
                      <td className="flex justify-center items-center align-middle">
                        <button className="bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 text-white rounded-sm p-2 my-2 transition-colors duration-300">
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
