import Footer from "@/components/layout/Footer";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Announcement app",
  description: "A simple announcement app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={` bg-white dark:bg-[#000000] dark:text-white`}>
      <Toaster/>
        <Navbar/>
        <div className="max-w-5xl mx-auto ">
        {children}
        </div>
        <Footer/>
        </body>
    </html>
  );
}
