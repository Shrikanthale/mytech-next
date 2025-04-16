"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Images
import mainLogo from "../../src/assets/dashboardimgs/mainLogo.svg";
import dashboardinactive from "../../src/assets/dashboardimgs/dashboardinactive.svg";
import dashboardactive from "../../src/assets/dashboardimgs/dashboardactive.svg";
import ecommerceInactive from "../../src/assets/dashboardimgs/ecommerceInactive.svg";
import ecommerceActive from "../../src/assets/dashboardimgs/ecommerceActive.svg";
import projectInactive from "../../src/assets/dashboardimgs/projectInactive.svg";
import contactInactive from "../../src/assets/dashboardimgs/contactInactive.svg";
import fileexploreInactive from "../../src/assets/dashboardimgs/fileexploreInactive.svg";
import messageInactive from "../../src/assets/dashboardimgs/messageInactive.svg";
import calenderInactive from "../../src/assets/dashboardimgs/calenderInactive.svg";

export default function ResponsiveSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const location = usePathname();

  const isActive = (path) => location === path;

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: dashboardinactive,
      iconActive: dashboardactive,
    },
    {
      label: "E-commerce",
      href: "/ecommerce",
      icon: ecommerceInactive,
      iconActive: ecommerceActive,
    },
    {
      label: "Project",
      href: "/project",
      icon: projectInactive,
      iconActive: ecommerceActive,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: contactInactive,
      iconActive: dashboardactive,
    },
    {
      label: "File Manager",
      href: "/file-manager",
      icon: fileexploreInactive,
      iconActive: ecommerceActive,
    },
    {
      label: "Chat",
      href: "/chat",
      icon: messageInactive,
      iconActive: dashboardactive,
    },
    {
      label: "Calendar",
      href: "/calendar",
      icon: calenderInactive,
      iconActive: ecommerceActive,
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16 flex items-center px-4 z-20">
        <button onClick={toggleSidebar} className="p-2" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="ml-4 flex items-center">
          <Image src={mainLogo} alt="logo" width={24} height={24} />
          <h1 className="ml-2 text-lg font-medium">Mytech</h1>
        </div>
      </header>

      {/* Backdrop Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleSidebar} />
      )}

      {/* Sidebar Content */}
      <div className="p-4 flex items-center">
        <Image src={mainLogo} alt="logo" width={32} height={32} priority />
        <h1 className="ml-2 text-lg font-semibold text-[#1D1F2C]">Mytech</h1>
        <button onClick={toggleSidebar} className="ml-auto p-2 md:hidden" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="mt-6">
        <ul className="space-y-1" onClick={() => sidebarOpen && setSidebarOpen(false)}>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200  ${
                    active
                      ? "text-[#2086BF] bg-[#EAF8FF] border-l-4 border-[#2086BF]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#2086BF] border-l-4 border-transparent"
                  }`}
                >
                  <Image
                    src={active ? item.iconActive : item.icon}
                    alt={`${item.label} icon`}
                    width={22}
                    height={22}
                    className="shrink-0"
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
