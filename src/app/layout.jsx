import Footer from "@/components/layout/Footer";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import Main from "./Main";


export const metadata = {
  title: "Announcement app",
  description: "A simple announcement app",
};

export default function RootLayout({ children }) {
  return (
    <>
    <Main>
      {children}
    </Main>
    </>
  );
}
