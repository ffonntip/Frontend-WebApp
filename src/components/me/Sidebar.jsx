"use client";

import { useState } from "react";
import { Menu, X, Home, Settings, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-gray-900 text-white w-64 p-5 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold mb-6">
            64050154_Fontip 
        </h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/users" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800">
            <Users className="h-5 w-5" />
            <span>Users</span>
          </Link>
          <Link href="/documents" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800">
            <FileText className="h-5 w-5" />
            <span>Documents</span>
          </Link>
          <Link href="/settings" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Main content */}
      {/* <div className="flex-1 p-6 md:ml-64 border-2">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="mt-2">This is the main content area.</p>
      </div> */}
    </div>
  );
}
