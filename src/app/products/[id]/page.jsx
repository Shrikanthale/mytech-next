"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {
  FaSave,
  FaTimes,
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaIndent,
  FaOutdent,
  FaLink,
  FaImage,
  FaPlus,
} from "react-icons/fa";

import { products } from "../../../datastore/Products";
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded ${
          editor.isActive("bold") ? "bg-gray-200" : ""
        }`}
      >
        <FaBold className="text-gray-700" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded ${
          editor.isActive("italic") ? "bg-gray-200" : ""
        }`}
      >
        <FaItalic className="text-gray-700" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 rounded ${
          editor.isActive("underline") ? "bg-gray-200" : ""
        }`}
      >
        <FaUnderline className="text-gray-700" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-1 rounded ${
          editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
        }`}
      >
        <FaAlignLeft className="text-gray-700" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-1 rounded ${
          editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
        }`}
      >
        <FaAlignCenter className="text-gray-700" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-1 rounded ${
          editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
        }`}
      >
        <FaAlignRight className="text-gray-700" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-1 rounded ${
          editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""
        }`}
      >
        <FaAlignJustify className="text-gray-700" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded ${
          editor.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
      >
        <FaListUl className="text-gray-700" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded ${
          editor.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
      >
        <FaListOl className="text-gray-700" />
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .setLink({ href: prompt("URL", "https://") })
            .run()
        }
        className="p-1 rounded"
      >
        <FaLink className="text-gray-700" />
      </button>
      <button
        onClick={() => {
          const url = prompt("Image URL", "https://");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-1 rounded"
      >
        <FaImage className="text-gray-700" />
      </button>
    </div>
  );
};

export default function EditProduct({ params }) {
  const findProduct = products.find(
    (product) => product.id === Number(params.id)
  );
  const [formData, setFormData] = useState({
    name: findProduct.name,
    price: findProduct.price,
    sku: findProduct.sku,
    barcode: findProduct.barcode,
    quantity: findProduct.quantity,
    status: findProduct.status,
    category: findProduct.category,
    weight: findProduct.weight,
    height: findProduct.height,
    width: findProduct.width,
    length: findProduct.length,
    variations: findProduct.variations || [],
    description: findProduct.description,
  });

  console.log("findProduct", findProduct, params.id);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `
      <p>Smartwatch for step-counter notify you incoming calls, SMS notifications, when you connect the smartphone with this android smartwatch,and vibrate to alert you if your phone notification is vibrating. You can reject calls and view message directly from your watch. A best gift for family and friends!</p>
    `,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addVariation = () => {
    setFormData((prev) => ({
      ...prev,
      variations: [...prev.variations, { type: "Color", value: "" }],
    }));
  };

  const removeVariation = (index) => {
    setFormData((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Edit Product
            </h1>
            <div className="text-sm text-gray-500 flex items-center">
              <Link href="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
              <span className="mx-2">/</span>
              <Link href="/product-list" className="hover:text-blue-500">
                Product List
              </Link>
              <span className="mx-2">/</span>
              <span>Edit Product</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center gap-1">
              <FaTimes className="text-gray-500" />
              <span>Cancel</span>
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-1">
              <FaSave className="text-white" />
              <span>Save Product</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* General Information */}
            <div className="bg-white rounded-md shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                General Information
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden text-gray-500">
                  <MenuBar editor={editor} />
                  <EditorContent editor={editor} className="p-2 min-h-32" />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="bg-white rounded-md shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Media</h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 bg-green-400 rounded-full p-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Drag and drop images here, or click and upload
                </p>
                <button className="text-blue-500 text-sm">Add Image</button>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-md shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-6 border border-gray-300 rounded-md text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Type
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md text-gray-500">
                    <option>No Discount</option>
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                    placeholder="0%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Class
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md text-gray-500">
                    <option>Tax Free</option>
                    <option>Standard Rate</option>
                    <option>Reduced Rate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ">
                    VAT Amount (%)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                    placeholder="0%"
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-md shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Variation */}
            <div className="bg-white rounded-md shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Variation
              </h2>
              {formData.variations.map((variation, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Variation Type
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md text-gray-500">
                      <option>Color</option>
                      <option>Size</option>
                      <option>Material</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Variation
                    </label>
                    <input
                      type="text"
                      value={variation.value}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                    />
                    <button
                      onClick={() => removeVariation(index)}
                      className="absolute right-2 top-8 text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addVariation}
                className="flex items-center text-blue-500 text-sm mt-2"
              >
                <FaPlus className="mr-1" /> Add Variant
              </button>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-md shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Shipping
              </h2>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    This is a physical product
                  </span>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                  />
                  <span className="text-xs text-gray-500">kg</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height
                  </label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                  />
                  <span className="text-xs text-gray-500">cm</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Length
                  </label>
                  <input
                    type="text"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                  />
                  <span className="text-xs text-gray-500">cm</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width
                  </label>
                  <input
                    type="text"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                  />
                  <span className="text-xs text-gray-500">cm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Status */}
            <div className="bg-white rounded-md shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Status</h2>
              <div className="mb-4">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                  Published
                </span>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                >
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-md shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Category
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                >
                  <option>Watch</option>
                  <option>Electronics</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Tags
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-500 text-gray-500"
                    placeholder="Add tags"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                    Watch <button className="ml-1 text-blue-700">×</button>
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                    Gadget <button className="ml-1 text-blue-700">×</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
