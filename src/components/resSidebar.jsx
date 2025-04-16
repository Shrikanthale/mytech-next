"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import mainLogo from "../../src/assets/dashboardimgs/mainLogo.svg"
export default function ResponsiveSidebar() {
  // This needs to be a client component since we're using state

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const location = usePathname();
  const isActive = (path) => {
    return location === path
      ? "text-[#2086BF] bg-[#EAF8FF] border-l-4 border-[#2086BF]"
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent";
  };

  return (
    <>
      {/* Mobile Header with hamburger */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16 flex items-center px-4 z-20">
        <button
          onClick={toggleSidebar}
          className="p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="ml-4 flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="ml-2 text-lg font-medium">Mytech</h1>
        </div>
      </header>

      {/* Mobile backdrop overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar for both mobile and desktop */}
      {/* <aside
        className={`fixed top-0 left-0 h-full z-40 bg-white border-r border-gray-200 w-60 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:sticky md:z-0`}
      > */}
      <div className="p-4 flex items-center">
      <Image
          className="dark:invert"
          src={mainLogo}
          alt="logo"
          width="auto"
          height="auto"
          priority
        />
        <h1 className="ml-2 text-lg font-medium text-[#1D1F2C] ">Mytech</h1>

        {/* Close button - visible only on mobile */}
        <button
          onClick={toggleSidebar}
          className="ml-auto p-2 md:hidden focus:outline-none"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <nav className="mt-6">
        <ul
          className="space-y-1"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center px-4 py-2 text-sm font-medium ${isActive(
                "/dashboard"
              )}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/ecommerce"
              className={`flex items-center px-4 py-2 text-sm font-medium ${isActive(
                "/ecommerce"
              )}`}
            >
              E-commerce
            </Link>
          </li>

          <li>
            <Link
              href="/project"
              className={`flex items-center px-4 py-2 text-sm font-medium ${isActive(
                "/project"
              )}`}
            >
              Project
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`flex items-center px-4 py-2 text-sm font-medium ${isActive(
                "/contact"
              )}`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/file-manager"
              className={`flex items-center px-4 py-2 text-sm font-medium ${isActive(
                "/file-manager"
              )}`}
            >
              File Manager
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className={`flex items-center px-4 py-2 text-sm font-medium ${isActive(
                "/chat"
              )}`}
            >
              Chat
            </Link>
          </li>
          <li>
            <Link
              href="/calendar"
              className={`flex items-center px-4 py-2 text-sm font-medium ${isActive(
                "/calendar"
              )}`}
            >
              Calendar
            </Link>
          </li>
        </ul>
      </nav>
      {/* </aside> */}
    </>
  );
}
