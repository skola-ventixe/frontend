import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/layout.css";
import { AuthProvider } from "@/context/authContext";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ventixe",
  description: "Best Event Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
