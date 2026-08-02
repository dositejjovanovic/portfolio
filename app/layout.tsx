import type { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import LocaleHtmlAttributes from "@/components/LocaleHtmlAttributes";


export const metadata: Metadata = {
  title: "Dositej Jovanović",
  description:
    "Student, youth representative and designer passionate about education, technology and international cooperation.",
  alternates: { canonical: "/", languages: { en: "/", "sr-Latn": "/sr" } },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <body className="antialiased">

        <ThemeProvider>
          <LocaleHtmlAttributes />
          <Navbar />
          {children}

        </ThemeProvider>


      </body>

    </html>
  );
}
