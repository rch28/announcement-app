"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import { useStore } from "@/stores/store";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Main = ({ children }) => {
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  useEffect(() => {
    const theme = Cookies.get("theme") || "dark" ;
    setTheme(theme);
  }, []);

  return (
    <html lang="en" className={theme}>
      <body className={` bg-white dark:bg-[#000000] dark:text-white`}>
        <Toaster />
        <Navbar />
        <div className="max-w-5xl mx-auto ">{children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default Main;
