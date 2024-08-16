import { Toaster } from "react-hot-toast";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Style } from "@/lib/Style";


export const metadata = {
  title: "Announcement app",
  description: "A simple announcement app",
};

export default function RootLayout({ children }) {
  const setInitialTheme = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
`;
  return (
    <>
      <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
        <body className={` ${Style.primary} dark:text-white  `}>
          <Toaster />
          <Navbar />
          <div className="max-w-5xl mx-auto ">{children}</div>
          <Footer />
        </body>
      </html>
    </>
  );
}
