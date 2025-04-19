"use client"
import { useState, useEffect } from 'react';
import { Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function RecentOrdersDashboard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "Handmade Pouch",
      additionalInfo: "+3 other products",
      customer: "John Bushmill",
      email: "johnb@email.com",
      total: 121.00,
      status: "Processing"
    },
    {
      id: 2,
      product: "Smartwatch E2",
      additionalInfo: "+1 other products",
      customer: "Ilham Budi Agung",
      email: "ilhambudii@email.com",
      total: 590.00,
      status: "Processing"
    },
    {
      id: 3,
      product: "Smartwatch E1",
      additionalInfo: "",
      customer: "Mohammad Karim",
      email: "m_karim@email.com",
      total: 125.00,
      status: "Shiped"
    },
    {
      id: 4,
      product: "Headphone G1 Pro",
      additionalInfo: "+1 other products",
      customer: "Linda Blair",
      email: "lindablair@email.com",
      total: 348.00,
      status: "Shiped"
    },
    {
      id: 5,
      product: "Iphone X",
      additionalInfo: "",
      customer: "Josh Adam",
      email: "josh_adam@email.com",
      total: 607.00,
      status: "Delivered"
    }
  ]);

  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to change the page
  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get page numbers to display based on screen size
  const getPageNumbers = () => {
    const pageNumbers = [];

    // For extra small screens (mobile), show minimal pagination
    if (windowWidth < 480) {
      if (totalPages <= 3) {
        // If only few pages, show all
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show current page with prev/next only
        return [currentPage];
      }
    }
    // For small screens
    else if (windowWidth < 640) {
      if (totalPages <= 5) {
        // If only few pages, show all
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage <= 2) {
        return [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 1) {
        return [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        return [1, "...", currentPage, "...", totalPages];
      }
    }
    // For medium screens and above
    else {
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage <= 3) {
        return [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        return [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        return [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  // Calculate range of items being displayed
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "text-orange-500 bg-orange-50 px-3 py-1 rounded-lg";
      case "Shiped":
        return "text-blue-500 bg-blue-50 px-3 py-1 rounded-lg";
      case "Delivered":
        return "text-green-500 bg-green-50 px-3 py-1 rounded-lg";
      default:
        return "text-gray-500 bg-gray-50 px-3 py-1 rounded-lg";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow max-w-6xl mx-auto w-full">
      {/* Header section with specific background */}
      <div className="bg-white rounded-t-lg px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
            <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs text-green-700 bg-green-100 ">+2 Orders</span>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Select Date
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            <div className="text-[#2086BF] px-3 py-1.5 text-sm bg-[#EAF8FF] rounded-lg">See All</div>
          </div>
        </div>
      </div>

      {/* Table section - with responsive container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 text-left px-6">
                <div className="flex items-center text-sm text-gray-500 font-medium">
                  Product
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="py-3 text-left px-6">
                <div className="flex items-center text-sm text-gray-500 font-medium">
                  Customer
                </div>
              </th>
              <th className="py-3 text-left px-6">
                <div className="flex items-center text-sm text-gray-500 font-medium">
                  Total
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="py-3 text-left px-6">
                <div className="flex items-center text-sm text-gray-500 font-medium">
                  Status
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="py-3 text-left px-6">
                <div className="flex items-center text-sm text-gray-500 font-medium">
                  Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr 
                key={order.id} 
                className={`hover:bg-gray-50 ${index !== orders.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded mr-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{order.product}</div>
                      {order.additionalInfo && (
                        <div className="text-xs text-gray-500">{order.additionalInfo}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm font-medium text-gray-800">${order.total.toFixed(2)}</div>
                </td>
                <td className="py-4 px-6">
                  <span className={`${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye size={18} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 p-3">
          <div className="text-gray-500 text-xs sm:text-sm">
            Showing {firstItem}-{lastItem} from {totalItems}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg cursor-pointer ${currentPage === 1
                ? "bg-blue-50 text-blue-300 cursor-not-allowed"
                : "bg-blue-50 text-blue-500 hover:bg-blue-100"
                }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={windowWidth < 640 ? 16 : 20} />
            </button>
            {pageNumbers.map((number, index) =>
              number === "..." ? (
                <div
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-blue-500 font-medium"
                >
                  ...
                </div>
              ) : (
                <button
                  key={number}
                  onClick={() => changePage(number)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-medium cursor-pointer ${currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-blue-50 text-blue-500 hover:bg-blue-100"
                    }`}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg cursor-pointer ${currentPage === totalPages
                ? "bg-blue-50 text-blue-300 cursor-not-allowed"
                : "bg-blue-50 text-blue-500 hover:bg-blue-100"
                }`}
              aria-label="Next page"
            >
              <ChevronRight size={windowWidth < 640 ? 16 : 20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}