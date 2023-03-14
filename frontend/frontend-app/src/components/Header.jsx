import React from "react";

import { FaTooth } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="p-4 flex flex-col md:flex-row flex-wrap justify-between items-center bg-slate-600">
      <div className="flex items-center mb-6 md:mb-0">
        <h1 className="text-white text-lg font-bold mr-2">Centro Güemes</h1>
        <FaTooth className="text-white text-lg" />
      </div>

      <div className="flex justify-between">
        <form action="/login" method="GET">
          <button className="mr-8 transition-all duration-300 ease-in-out border-solid  hover:bg-white hover:text-black text-white font-bold py-2 px-4 border border-white rounded-none">
            Iniciar Sesión
          </button>
        </form>

        <form action="/signup" method="GET">
          <button className="transition-all duration-300 ease-in-out border-solid  hover:bg-white hover:text-black text-white font-bold py-2 px-4 border border-white rounded-none">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
