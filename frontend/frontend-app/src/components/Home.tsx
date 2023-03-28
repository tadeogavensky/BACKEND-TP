import React, { useEffect, useState } from "react";

import { Main } from "./Main";
import { Navbar } from "./Navbar";

export const Home: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  const sendHome = () => {
    fetch("api/v1/")
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    sendHome();
  }, []);

  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
};
