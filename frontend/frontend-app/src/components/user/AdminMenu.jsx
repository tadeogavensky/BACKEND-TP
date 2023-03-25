import React, { useState } from "react";
import { Appoitment } from "../Clinic/Appoitment";
import { DentistTable } from "../Clinic/DentistTable";
import PatientTable from "../Clinic/PatientTable";

export const AdminMenu = () => {

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
    <>
      <div className="md:w-1/2 md:flex m-8">
        {optAppointment && <Appoitment />}
        <div className="flex flex-row items-center w-full flex-wrap">
          {optDP && <PatientTable />}
          {optDP && <DentistTable />}
        </div>
      </div>
    </>
  );
};
