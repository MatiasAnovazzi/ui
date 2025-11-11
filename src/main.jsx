import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import FaviconSetter from "./FunctionSetter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FaviconSetter /> {/* Agregar el componente que establece el favicon */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);