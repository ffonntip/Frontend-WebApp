"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Drone, Lightbulb, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Config() {
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
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
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
  );
}
