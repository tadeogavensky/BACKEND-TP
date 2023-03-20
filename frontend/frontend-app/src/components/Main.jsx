import React, { useState } from "react";
import banner from "../assets/img/hero-banner.jpg";
import { Appoitment } from "./Clinic/Appoitment";
import { DentistTable } from "./Clinic/DentistTable";
import PatientTable from "./Clinic/PatientTable";

export const Main = () => {
  let username = "Tadeo";

  const [optAppointment, setOptAppointment] = useState(false);
  const [optDP, setOptDP] = useState(false);

  const handleOptAppointment = () => {
    setOptAppointment(true);
    setOptDP(false);
  };

  const handleDPAppointment = () => {
    setOptAppointment(false);
    setOptDP(true);
  };

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <div className="flex flex-col h-full  justify-center items-center md:w-1/2 mt-8">
        <h1 className="text-4xl font-bold text-blue-600 p-2 pl-4 pr-4 mb-6">
          Welcome {username}
        </h1>
        <button
          className="text-lg font-bold rounded-md hover:bg-black transition-all ease-in-out duration-300 bg-indigo-700 border-indigo-700 border text-white p-4 mb-6 w-1/2"
          onClick={handleDPAppointment}
        >
          Manage patients & dentists
        </button>
        <button
          className="text-lg font-bold rounded-md hover:bg-black transition-all ease-in-out duration-300 bg-indigo-700 border-indigo-700 border text-white p-4 w-1/2"
          onClick={handleOptAppointment}
        >
          Manage appointments
        </button>
      </div>
      <div className="md:w-1/2 md:flex m-8">
        {optAppointment && <Appoitment />}
        <div className="flex flex-row items-center w-full flex-wrap">
          {optDP && <PatientTable />}
          {optDP && <DentistTable />}
        </div>
      </div>
    </div>
  );
};
