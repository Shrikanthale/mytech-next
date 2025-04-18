// In components/resSidebar.js
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";

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
  const [expandedItems, setExpandedItems] = useState({});

  // Create a ref object for each dropdown menu
  const dropdownRefs = useRef({});

  const toggleExpand = (label) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: dashboardinactive,
      iconActive: dashboardactive,
    },
    {
      label: "E-commerce",
      icon: ecommerceInactive,
      iconActive: ecommerceActive,
      children: [
        { label: "Products", href: "/products" },
        { label: "Orders", href: "/orders" },
        { label: "Customers", href: "/customers" },
        { label: "Analytics", href: "/analytics" },
      ],
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
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = item.href ? isActive(item.href) : false;
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItems[item.label];
                const isChildActive =
                  hasChildren &&
                  item.children.some((child) => isActive(child.href));

                return (
                  <li key={item.label} className="overflow-hidden">
                    {hasChildren ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                            isChildActive
                              ? "text-[#2086BF] bg-[#EAF8FF] border-l-4 border-[#2086BF]"
                              : "text-gray-600 hover:bg-gray-100 hover:text-[#2086BF] border-l-4 border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={isChildActive ? item.iconActive : item.icon}
                              alt={`${item.label} icon`}
                              width={22}
                              height={22}
                              className="shrink-0"
                            />
                            {item.label}
                          </div>
                          <div
                            className={`transform transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            <ChevronDown size={16} />
                          </div>
                        </button>

                        {/* Dropdown container with smooth height animation */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded
                              ? "max-h-40 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <ul className="pl-10 mt-1 space-y-1 py-1">
                            {item.children.map((child) => {
                              const childActive = isActive(child.href);
                              return (
                                <li
                                  key={child.href}
                                  className="transform transition-all duration-300 ease-in-out"
                                >
                                  <Link
                                    href={child.href}
                                    onClick={() => onClose?.()}
                                    className={`block py-2 px-2 text-sm transition-colors duration-200 ${
                                      childActive
                                        ? "text-[#2086BF] bg-[#EAF8FF] font-medium"
                                        : "text-gray-600 hover:text-[#2086BF]"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => onClose?.()}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                          active
                            ? "text-[#2086BF] bg-[#EAF8FF] border-l-4 border-[#2086BF]"
                            : "text-gray-600 hover:bg-gray-100 hover:text-[#2086BF] border-l-4 border-transparent"
                        }`}
                      >
                        <Image
                          src={active ? item.iconActive : item.icon}
                          width={22}
                          height={22}
                          alt={`${item.label} icon`}
                          className="shrink-0"
                        />
                        {item.label}
                      </Link>
                    )}
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
