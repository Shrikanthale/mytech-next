// In components/resSidebar.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Images (import paths remain the same)
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

export default function ResponsiveSidebar({ isMobileHeader = false, onClose }) {
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
      {/* Mobile Header Content (only shown if isMobileHeader is true) */}
      {isMobileHeader && (
        <>
          <Image src={mainLogo} alt="logo" width={24} height={24} />
          <h1 className="ml-2 text-lg font-medium">Mytech</h1>
        </>
      )}

      {/* Sidebar Content (always shown in the sidebar <aside>) */}
      {!isMobileHeader && (
        <>
          <div className="p-4 flex items-center">
            <Image src={mainLogo} alt="logo" width={32} height={32} priority />
            <h1 className="ml-2 text-lg font-semibold text-[#1D1F2C]">
              Mytech
            </h1>
            <button
              onClick={onClose}
              className="ml-auto p-2 md:hidden cursor-pointer"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="black"
                stroke="black"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6">
            <ul className="space-y-1" onClick={() => onClose?.()}>
              {" "}
              {/* Call onClose if it exists */}
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
      )}
    </>
  );
}
