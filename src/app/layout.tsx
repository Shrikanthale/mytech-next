
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ResponsiveSidebar from "@/components/resSidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mytech Dashboard",
  description: "Dashboard application by Mytech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-gray-50`}
      >
        <ResponsiveSidebar />
        <main className="md:ml-60 pt-16 md:pt-0 min-h-screen">
          <div className="h-full p-4 overflow-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

// Client component for the responsive sidebar
