"use client";

import { useEffect } from "react";

const ClientThemeProvider = () => {
  useEffect(() => {
    const setTheme = (theme) => {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    };

    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return null; // This component does not render anything
};

export default ClientThemeProvider;
