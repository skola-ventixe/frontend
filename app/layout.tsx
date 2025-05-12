import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/layout.css";
import Header from "@/components/header/header";
import Nav from "@/components/nav/nav";

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
        <div className="layout-grid">
          <Nav />
          <div>
            <Header />
            <main className="flex-grow p-4">{children}</main>
            <footer className="bg-gray-800 text-white p-4">
              <p>&copy; 2023 My App</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
