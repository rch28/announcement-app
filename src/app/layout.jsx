import { Toaster } from "react-hot-toast";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


export const metadata = {
  title: "Announcement app",
  description: "A simple announcement app",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <body className={` bg-gray-200 dark:bg-[#000000] dark:text-white  `}>
      <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setTheme(theme) {
                  document.documentElement.className = theme;
                  localStorage.setItem('theme', theme);
                }
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  setTheme('dark');
                } else {
                  setTheme('light');
                }
              })();
            `,
          }}
        />
        <Toaster />
        <Navbar />
        <div className="max-w-5xl mx-auto ">{children}</div>
        <Footer />
      </body>
    </html>
    </>
  );
}
