import React, { createContext, useState, useContext, useEffect } from "react";
import { useMantineColorScheme } from "@mantine/core";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    setColorScheme(darkMode ? "light" : "dark"); // Sync Mantine with our state
  };

  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
