"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Download,
  Edit2,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

export default function ProductManagementUI() {
  const [selectedTab, setSelectedTab] = useState("All Product");
  const [selectedProducts, setSelectedProducts] = useState([302010, 302011]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const tabs = ["All Product", "Published", "Low Stock", "Draft"];

  const products = [
    {
      id: 302010,
      name: "Handmade Pouch",
      variants: 3,
      sku: "302010",
      category: "Bag & Pouch",
      stock: 10,
      price: "$121.00",
      status: "Low Stock",
      added: "29 Dec 2022",
    },
    {
      id: 302011,
      name: "Smartwatch E2",
      variants: 3,
      sku: "302011",
      category: "Watch",
      stock: 204,
      price: "$595.00",
      status: "Published",
      added: "24 Dec 2022",
    },
    {
      id: 301002,
      name: "Smartwatch E1",
      variants: 3,
      sku: "301002",
      category: "Watch",
      stock: 46,
      price: "$125.00",
      status: "Draft",
      added: "12 Dec 2022",
    },
    {
      id: 301061,
      name: "Headphone G1 Pro",
      variants: 1,
      sku: "301061",
      category: "Audio",
      stock: 401,
      price: "$348.00",
      status: "Published",
      added: "21 Oct 2022",
    },
    {
      id: 301960,
      name: "iPhone X",
      variants: 4,
      sku: "301960",
      category: "Smartphone",
      stock: 120,
      price: "$607.00",
      status: "Published",
      added: "21 Oct 2022",
    },
    {
      id: 301861,
      name: "Puma Shoes",
      variants: 3,
      sku: "301861",
      category: "Shoes",
      stock: 432,
      price: "$234.00",
      status: "Published",
      added: "21 Oct 2022",
    },
    {
      id: 301643,
      name: "Logic+ Wireless Mouse",
      variants: 1,
      sku: "301643",
      category: "Mouse",
      stock: 0,
      price: "$760.00",
      status: "Out of Stock",
      added: "19 Sep 2022",
    },
    {
      id: 301600,
      name: "Nike Shoes",
      variants: 2,
      sku: "301600",
      category: "Shoes",
      stock: 347,
      price: "$400.00",
      status: "Published",
      added: "19 Sep 2022",
    },
    {
      id: 301555,
      name: "Lego Car",
      variants: 2,
      sku: "301555",
      category: "Toys",
      stock: 299,
      price: "$612.00",
      status: "Published",
      added: "19 Sep 2022",
    },
    {
      id: 301002,
      name: "PR Wireless Controller",
      variants: 5,
      sku: "301002",
      category: "Beauty",
      stock: 38,
      price: "$123.00",
      status: "Draft",
      added: "10 Aug 2022",
    },
  ];

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'text-emerald-500';
      case 'Low Stock':
        return 'text-amber-500';
      case 'Out of Stock':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  const [activeTab, setActiveTab] = useState("All Product");
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-1xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Product
            </h1>
            <div className="flex text-xs md:text-sm mt-1 text-gray-500">
              <span>Dashboard</span>
              <span className="mx-2">/</span>
              <span className="text-gray-800">Product List</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
                JP
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">Jeni Point</div>
                <div className="text-xs text-gray-500">Manager</div>
              </div>
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
              <div className="font-medium">{selectedTab}</div>
              <div className="w-5"></div> {/* Empty space for alignment */}
            </div>
            {mobileMenuOpen && (
              <div className="bg-white p-4 border-t">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-md mb-1 ${
                      selectedTab === tab
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

          <div className="p-4 md:p-5">
            {/* Search and Filters - Desktop */}
            <div className="hidden md:flex justify-between mb-4">
              <div className="inline-flex gap-2 items-center rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                {tabs.map((tab) => {
                  const isActive = tab === activeTab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#EAF8FF] text-[#2086BF]"
                          : "text-[#667085] hover:bg-gray-100"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <select className="appearance-none pl-4 pr-8 py-2 border rounded-md text-sm w-32">
                    <option>Select Date</option>
                  </select>
                </div>
                <button className="flex items-center px-4 py-2 text-sm border rounded-md">
                  <Filter size={16} className="mr-2" />
                  Filters
                </button>
                <button className="flex items-center px-4 py-2 text-sm border rounded-md">
                  <Edit2 size={16} className="mr-2" />
                  Edit Column
                </button>
              </div>
            </div>

            {/* Search and Filters - Mobile */}
            <div className="md:hidden mb-4">
              <div className="relative mb-3">
                <Search
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search product..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full text-sm"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={toggleMobileFilters}
                  className="flex items-center px-3 py-1.5 text-xs border rounded-md"
                >
                  <Filter size={14} className="mr-1" />
                  Filters
                </button>
                <button className="flex items-center px-3 py-1.5 text-xs border rounded-md">
                  <Edit2 size={14} className="mr-1" />
                  Edit Column
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
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3 w-12">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={handleSelectAll}
                        checked={selectedProducts.length === products.length}
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
                  {products.map((product) => (
                    <tr
                    key={product.id}
                    className={`hover:bg-gray-50 ${
                      selectedProducts.includes(product.id) ? "bg-gray-100" : ""
                    }`}
                  >
                  
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                              {product.variants} variants
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
                        {product.stock}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {product.price}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                      <span
                      className={`text-xs px-2 py-1 rounded-sm ${
                        product.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : product.status === "Out of Stock"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.status}
                    </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {product.added}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card view for mobile */}
            <div className="md:hidden">
              {products.map((product) => (
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
                      <span className="font-medium text-sm">
                        {product.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : product.status === "Out of Stock"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
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
                          {product.variants} variants
                        </div>
                        <div className="text-sm font-medium mb-1">
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
                        {product.stock}
                      </div>
                      <div>
                        <span className="text-gray-500">Added:</span>{" "}
                        {product.added}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 border-t pt-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="text-gray-500 text-xs md:text-sm">
                Showing 1-10 from 100
              </div>
              <div className="flex">
                <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md border mr-1 text-gray-500 hover:bg-gray-50">
                  <ChevronLeft size={14} />
                </button>
                <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md bg-blue-600 text-white mr-1">
                  1
                </button>
                <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md border mr-1 text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 items-center justify-center rounded-md border mr-1 text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 items-center justify-center rounded-md border mr-1 text-gray-700 hover:bg-gray-50">
                  4
                </button>
                <button className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 items-center justify-center rounded-md border mr-1 text-gray-700 hover:bg-gray-50">
                  5
                </button>
                <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md border text-gray-500 hover:bg-gray-50">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}