import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./Components/ThemeContext";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MantineProvider>

);
