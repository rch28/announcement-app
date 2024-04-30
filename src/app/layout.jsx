import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Announcement app",
  description: "A simple announcement app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={`bg-[#E6FFFF] dark:bg-[#09010F]`}>
      <Toaster/>
        <Navbar/>
        <div className="max-w-5xl mx-auto ">
        {children}
        </div>
        
        </body>
    </html>
  );
}
