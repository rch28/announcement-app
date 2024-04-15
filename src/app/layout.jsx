import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Announcement app",
  description: "A simple announcement app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={`${inter.className} bg-[#E6FFFF] dark:bg-[#09010F]`}>
        <Navbar/>
        <div className="max-w-6xl mx-auto ">
        {children}
        </div>
        
        </body>
    </html>
  );
}
