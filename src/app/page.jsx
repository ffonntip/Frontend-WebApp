"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, Settings, Users, FileText, Info, Thermometer, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Drone, Lightbulb, Globe } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { Poppins, Kalam } from "next/font/google";
import { Separator } from "@/components/ui/separator"
import Configs from "@/components/me/config";
import TempLog from "@/components/me/templog";
import Logs from "@/components/me/logs";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const poppin4 = Poppins({ subsets: ["latin"], weight: "400" });
const poppin3 = Poppins({ subsets: ["latin"], weight: "300" });
const poppin1 = Poppins({ subsets: ["latin"], weight: "100" });
const kalam = Kalam({ subsets: ["latin"], weight: "400" });
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
        className={`md:h-screen inset-y-0 left-0 z-50 h-full w-64 bg-slate-100 border-r text-black p-5 
              transition-transform duration-300 ease-in-out md:relative md:translate-x-0 
              sticky top-0 overflow-y-auto portrait:overflow-y-auto landscape:overflow-hidden`}
      >


        <button className="absolute top-3 right-1 md:hidden" onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6" />
        </button>


        <p
          className={` mb-6 text-transparent inline-block mr-9 px-3 py-2 rounded-full border-2 border-sky-100 shadow-lg 
      bg-gradient-to-t from-amber-50 via-pink-50 to-emerald-50 drop-shadow-[0_0_15px_rgba(201,167,235,0.6)]`}
        >
          <span
            className={`text-xl font-extrabold text-transparent bg-clip-text 
         bg-gradient-to-r from-[#8dd2f7] via-[#cd9ffa] to-[#eea684] 
        ] ${poppins.className}`}
          >
            64050154_Fontip
          </span>
        </p>

        <nav className="flex flex-col space-y-4">
          <Link href="/viewconfig" className={`flex text-center text-lg   items-center space-x-3 p-2 rounded-xl hover:bg-gray-200 ${poppin3.className} `}>
            <Info className="h-5 w-5" />
            <span>View Config</span>
          </Link>
          <Link href="/temp" className={`flex text-center text-lg    items-center space-x-3 p-2 rounded-xl text-nowrap hover:bg-gray-200 ${poppin3.className} `}>
            <Thermometer className="h-5 w-5" />
            <span>Temp Logs Record</span>
          </Link>
          <Link href="/viewlogs" className={`flex text-center text-lg   items-center space-x-3 p-2 rounded-xl hover:bg-gray-200 ${poppin3.className} `}>
            <FileText className="h-5 w-5" />
            <span>View Logs</span>
          </Link>

        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6 " />
      </button>

      <div className="flex flex-col flex-1 min-h-screen bg-slate-100 p-2">
        {/* Top Bar */}

        <div className="w-full flex flex-wrap items-center space-x-2 md:text-nowrap bg-white shadow-md p-4 rounded-tl-3xl font-semibold text-gray-900 text-sm md:text-lg">
          <Link href="/#" className={`inline-block bg-stone-100 px-3.5 rounded-full transition-all duration-200 md:${poppin1.className} ${poppin4.className}`}>
            <span>Main</span>
          </Link>
          <ChevronRight className="w-3 h-3  text-gray-500" />
          <Link href="/viewconfig" className={`hover:text-gray-500 transition-all md:${poppin1.className}  duration-200 ${poppin4.className}`}>View Config</Link>
          <ChevronRight className="w-3 h-3  text-gray-500" />
          <Link href="/temp" className={`hover:text-gray-500 transition-all md:${poppin1.className} duration-200 ${poppin4.className}`}>Temp Logs Record</Link>
          <ChevronRight className="w-3 h-3  text-gray-500" />
          <Link href="/viewlogs" className={`hover:text-gray-500 transition-all md:${poppin1.className} duration-200 ${poppin4.className}`}>View Logs</Link>
        </div>

        <Separator />

        {/* Content Section */}
        <div className="container min-h-screen max-w-screen bg-white">
          <div className="grid justify-center grid-cols-1 md:grid-cols-2 gap-4">
            {/* ซ้ายบน */}
            <div className={`w-9/12 rounded-xs mx-auto  `}>
              <Configs />
            </div>

            {/* ขวาบน */}
            <div className="w-10/12 rounded-xl ">
              <TempLog />
            </div>

            {/* ตรงกลางล่าง (Logs ขยายเต็ม 2 คอลัมน์) */}
            <div className="w-full md:col-span-2 p-7 ">
              <Logs />
            </div>
          </div>
        </div>


      </div>
    </div>


  );
}