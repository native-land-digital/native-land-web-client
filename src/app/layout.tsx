import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Native Land Digital",
  description: "You are on Native Land.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NavBar />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
