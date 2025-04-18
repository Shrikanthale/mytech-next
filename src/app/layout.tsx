"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ResponsiveSidebar from "@/components/resSidebar";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Mytech Dashboard",
//   description: "Dashboard application by Mytech",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-gray-50 overflow-x-hidden`}
      >
        {/* Mobile Header with Hamburger Menu */}
        <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 z-30">
          <button onClick={toggleSidebar} className="p-2 focus:outline-none cursor-pointer" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="black" viewBox="0 0 24 24" stroke="black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center">
            <ResponsiveSidebar isMobileHeader={true} onClose={toggleSidebar} />
          </div>
        </header>
        
        {/* Sidebar Content */}
        <aside
          className={`fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-200 shadow-sm z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ResponsiveSidebar onClose={toggleSidebar} />
        </aside>
        
        {/* Backdrop Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          />
        )}
        
        {/* Main Content Area */}
        <main className={`md:ml-60 pt-16 md:pt-0 min-h-screen transition-all duration-300 ease-in-out w-full md:w-[calc(100%-15rem)] overflow-y-auto overflow-x-hidden ${sidebarOpen ? 'ml-0' : ''}`}>
          <div className="h-full w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}