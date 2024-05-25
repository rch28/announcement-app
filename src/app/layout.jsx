import "./globals.css";

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
