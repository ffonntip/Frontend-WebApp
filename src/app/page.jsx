"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, Settings, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Drone, Lightbulb, Globe } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [droneConfig, setDroneConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDroneConfig = async () => {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
      try {
        const response = await axios.get(`/configs/${droneId}`);
        setDroneConfig(response.data);
      } catch (error) {
        console.error("Error fetching drone config:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDroneConfig();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-slate-100 text-black w-64 p-5 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <button className="absolute top-4 right-4 md:hidden" onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold mb-6">64050154_Fontip</h2>
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

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen bg-slate-100 p-2  ">
        {/* Top Bar */}
        <div className="w-full bg-white shadow-md p-4 text-lg rounded-tl-3xl font-bold text-gray-900">Config</div>
        <div className="w-full bg-white shadow-md p-4 text-lg rounded-bl-3xl font-bold text-gray-900">

        {/* Config Section */}
        <div className="flex flex-1  justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            <Card className="shadow-lg border border-gray-300 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-center text-xl font-bold">Drone Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-40 rounded-xl" />
                ) : droneConfig ? (
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                      <p className="text-blue-500" />
                      <span className="font-semibold">Drone ID:</span> {droneConfig.drone_id}
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="text-green-500" />
                      <span className="font-semibold">Country:</span> {droneConfig.country}
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="text-yellow-500" />
                      <span className="font-semibold">Light:</span> {droneConfig.light}
                    </div>
                    <div>
                      <span className="font-semibold">Name:</span> {droneConfig.drone_name}
                    </div>
                    <div>
                      <span className="font-semibold">Weight:</span> {droneConfig.weight} kg
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-red-500">No configuration data available.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}