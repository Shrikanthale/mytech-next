"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Download,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Menu,
  Calendar,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products } from "../../datastore/Products";
import eyeball from "../../assets/productimg/eyeball.svg"
import plusicon from "../../assets/productimg/plusicon.svg"
import exporticon from "../../assets/productimg/exporticon.svg"
import arrowheader from "../../assets/productimg/arrowheader.svg"
export default function Page() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("All Product");
  const [selectedProducts, setSelectedProducts] = useState([302010, 302011]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Filter products based on selected tab and search query
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by tab
    if (selectedTab === "Published") {
      result = result.filter(product => product.status === "Published");
    } else if (selectedTab === "Low Stock") {
      result = result.filter(product => product.status === "Low Stock");
    } else if (selectedTab === "Draft") {
      result = result.filter(product => product.status === "Draft");
    }

    // Filter by search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedTab, searchQuery, products]);

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page products
  const currentProducts = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(currentProducts.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "text-emerald-500";
      case "Low Stock":
        return "text-amber-500";
      case "Out of Stock":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

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

  // Reset to first page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchQuery]);

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

  const tabs = ["All Product", "Published", "Low Stock", "Draft"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-1xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Product
            </h1>
            <div className="flex items-center justify-center text-xs md:text-sm mt-1 text-gray-500">
              <span style={{ color: "#2086BF", fontWeight: 500 }} >Dashboard</span>
              <span className="mx-2"> <Image src={arrowheader} alt="img" width={"auto"} height={"auto"} /> </span>
              <span className="text-gray-800">Product List</span>
            </div>
          </div>
          <div className="flex items-center hidden sm:inline ">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 py-3 px-4 rounded-lg bg-blue-50 text-[#2086BF] hover:bg-blue-100 transition-colors cursor-pointer">
                <Image src={exporticon} alt="" width={"auto"} height={"auto"} />
                <span className="font-medium">Export</span>
              </button>

              <button className="flex items-center gap-2 py-3 px-4 rounded-lg bg-[#2086BF] text-white hover:bg-blue-600 transition-colors cursor-pointer">
                <Image src={plusicon} alt="" width={"auto"} height={"auto"} />
                <span className="font-medium">Add Product</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="hidden md:flex flex-col lg:flex-row justify-between items-center mb-4 gap-3">
            {/* Tabs section - centered on md screens, left aligned on lg screens */}
            <div className="inline-flex gap-2 items-center rounded-lg border border-gray-200 bg-white p-1 shadow-sm mx-auto lg:mx-0">
              {tabs.map((tab) => {
                const isActive = tab === selectedTab;
                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-[#EAF8FF] text-[#2086BF]"
                      : "text-[#667085] hover:bg-gray-100"
                      }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mx-auto lg:mx-0">
              <div className="flex items-center rounded-md border border-gray-200 px-2 py-1.5">
                <Search className="text-gray-400 w-4 h-4 mr-1.5" />
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm text-gray-500 outline-none bg-transparent w-32"
                />
              </div>

              {/* Date selector */}
              <button className="flex items-center rounded-md border border-gray-200 px-2 py-1.5 text-gray-500">
                <Calendar className="text-gray-400 w-4 h-4 mr-1.5" />
                <span className="text-sm">Select Date</span>
              </button>

              {/* Filters */}
              <button className="flex items-center rounded-md border border-gray-200 px-2 py-1.5 text-gray-500 cursor-pointer">
                <SlidersHorizontal className="text-gray-400 w-4 h-4 mr-1.5" />
                <span className="text-sm">Filters</span>
              </button>

              {/* Edit column */}
              <button className="flex items-center rounded-md border border-gray-200 px-2 py-1.5 text-gray-500">
                <LayoutGrid className="text-gray-400 w-4 h-4 mr-1.5" />
                <span className="text-sm">Edit Column</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow mb-6">
          {/* Mobile Tab Menu */}
          <div className="md:hidden border-b">
            <div className="flex justify-between items-center p-4">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <Menu size={20} />
              </button>
              <div className="font-semibold text-gray-600">{selectedTab}</div>
              <div className="w-5"></div> {/* Empty space for alignment */}
            </div>
            {mobileMenuOpen && (
              <div className="bg-white p-4 border-t">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-md mb-1 ${selectedTab === tab
                      ? "text-blue-600 bg-blue-50 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                    onClick={() => {
                      setSelectedTab(tab);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Mobile Actions */}
          <div className="md:hidden flex justify-between p-4 border-b">
            <button className="flex items-center px-3 py-1.5 text-xs text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
              <Download size={14} className="mr-1" />
              Export
            </button>
            <button className="flex items-center px-3 py-1.5 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700">
              <Plus size={14} className="mr-1" />
              Add Product
            </button>
          </div>

          <div className="p-2 md:p-0 sm:p-2">
            {/* Search and Filters - Mobile */}
            <div className="md:hidden mb-4">
            <div className="flex items-center rounded-md border border-gray-200 px-2 py-1.5 mb-3">
                <Search className="text-gray-400 w-4 h-4 mr-1.5" />
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm text-gray-500 outline-none bg-transparent w-32"
                />
              </div>
              <div className="flex justify-between">
                  {/* Date selector */}
              <button className="flex items-center rounded-md border border-gray-200 px-2 py-1.5 text-gray-500">
                <Calendar className="text-gray-400 w-4 h-4 mr-1.5" />
                <span className="text-sm">Select Date</span>
              </button>

              {/* Filters */}
              <button className="flex items-center rounded-md border border-gray-200 px-2 py-1.5 text-gray-500 cursor-pointer">
                <SlidersHorizontal className="text-gray-400 w-4 h-4 mr-1.5" />
                <span className="text-sm">Filters</span>
              </button>
              </div>

              {showMobileFilters && (
                <div className="mt-3 p-3 border rounded-md bg-gray-50">
                  <div className="mb-3">
                    <label className="block text-xs font-medium mb-1 text-gray-700">
                      Date
                    </label>
                    <select className="w-full text-sm border rounded-md p-2">
                      <option>Select Date</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md">
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Table for larger screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-white-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                    <th className="px-4 py-3 w-12">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 accent-[#2086BF] w-4 h-4"
                        onChange={handleSelectAll}
                        checked={
                          currentProducts.length > 0 &&
                          currentProducts.every((product) =>
                            selectedProducts.includes(product.id)
                          )
                        }
                      />
                    </th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Added</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr
                        key={product.id}
                        className={`hover:bg-gray-50 ${selectedProducts.includes(product.id)
                          ? "bg-gray-100"
                          : ""
                          }`}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 accent-[#2086BF] w-4 h-4"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {product.variations ? product.variations.length : 0} variants
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-[#2086BF]">
                          {product.sku}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.quantity || product.stock || 0}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.price}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`text-xs px-2 py-1 rounded-sm ${product.status === "Published"
                              ? "bg-green-100 text-[#1A9882] font-medium"
                              : product.status === "Low Stock"
                                ? "bg-[#FFF0EA] text-[#F86624] font-medium"
                                : product.status === "Out of Stock"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-[#F0F1F3] text-[#667085]"
                              }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.added || "24 Dec 2022"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Edit2
                                style={{ cursor: "pointer" }}
                                size={16}
                                onClick={() => {
                                  router.push(`/products/${product.id}`);
                                }}
                              />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 size={16} style={{ cursor: "pointer" }} />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Image src={eyeball} alt="img" height={"auto"} width={"auto"} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Card view for mobile */}
            <div className="md:hidden">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-md mb-3 overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-3 bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                        />
                        <span className="font-xl text-gray-600 text-sm ">
                          {product.name}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${product.status === "Published"
                          ? "bg-green-100 text-[#1A9882] font-medium"
                          : product.status === "Low Stock"
                            ? "bg-[#FFF0EA] text-[#F86624] font-medium"
                            : product.status === "Out of Stock"
                              ? "bg-red-100 text-red-800"
                              : "bg-[#F0F1F3] text-[#667085]"
                          }`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex mb-2">
                        <div className="w-16 h-16 bg-gray-200 rounded-md mr-3"></div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            {product.variations ? product.variations.length : 0} variants
                          </div>
                          <div className="text-sm text-grey-700 font-medium mb-1">
                            {product.price}
                          </div>
                          <div className="text-xs text-[#2086BF]">
                            SKU: {product.sku}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                        <div>
                          <span className="text-gray-500">Category:</span>{" "}
                          {product.category}
                        </div>
                        <div>
                          <span className="text-gray-500">Stock:</span>{" "}
                          {product.quantity || product.stock || 0}
                        </div>
                        <div>
                          <span className="text-gray-500">Added:</span>{" "}
                          {product.added || "24 Dec 2022"}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 border-t pt-2">
                        <button
                          className="p-1.5 text-gray-400 hover:text-blue-600"
                          onClick={() => {
                            router.push(`/products/${product.id}`);
                          }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600">
                        <Image src={eyeball} alt="img" height={"auto"} width={"auto"} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-gray-500">No products found</div>
              )}
            </div>

            {/* Pagination - Only show if there are items */}
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
        </div>
      </div>
    </div>
  );
}