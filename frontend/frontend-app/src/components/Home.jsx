import React, { useEffect, useState } from "react";

import { Main } from "./Main";
import {Navbar} from "./Navbar";


export const Home = () => {
  const [htmlContent, setHtmlContent] = useState("");

  const sendHome = () => {
    fetch("api/v1/")
      .then((response) => setHtmlContent(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(()=>{sendHome()},[])
  return (
    <div /* dangerouslySetInnerHTML={{ __html: htmlContent }} */>
      <Navbar />
      <Main />
    </div>
  );
};
