import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Dositej Jovanović",
  description:
    "Student, youth representative and designer passionate about education, technology and international cooperation.",
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

      <body
        className={`
          ${inter.variable}
          ${space.variable}
          antialiased
        `}
      >

        <ThemeProvider>

          {children}

        </ThemeProvider>


      </body>

    </html>
  );
}
