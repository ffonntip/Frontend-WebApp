"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Home, Settings, Users, FileText, Info, Thermometer, ChevronRight } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ ใช้ SweetAlert2
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const poppin3 = Poppins({ subsets: ["latin"], weight: "300" });

export default function TempLog() {
    const [droneConfig, setDroneConfig] = useState(null);

    const form = useForm({
        defaultValues: {
            temperature: "",
        },
    });

    useEffect(() => {
        const fetchDroneConfig = async () => {
            const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
            try {
                const response = await axios.get(`/configs/${droneId}`);
                setDroneConfig(response.data);
            } catch (error) {
                console.error("Error fetching drone config:", error);
            }
        };
        fetchDroneConfig();
    }, []);

    const onSubmit = async (data) => {
        const droneId = parseInt(process.env.NEXT_PUBLIC_DRONE_ID);
        const droneName = process.env.NEXT_PUBLIC_DRONE_NAME;
        const country = process.env.NEXT_PUBLIC_COUNTRY;

        try {
            await axios.post(`/logs`, {
                drone_id: droneId,
                drone_name: droneName,
                celsius: data.temperature,
                country: country,
            });

            Swal.fire({
                title: "✅ Success!",
                text: "Temperature logged successfully!",
                icon: "success",
                confirmButtonColor: "#4CAF50",
            });

            form.reset();
        } catch (error) {
            console.error("Error submitting log:", error);
            Swal.fire({
                title: "❌ Error!",
                text: "Failed to log temperature.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="flex w-full h-80 justify-center p-6">
            <Card className="w-full max-w-md shadow-lg px-5 border border-gray-300 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className={`text-center mb-1 text-xl font-bold ${poppins.className}`}>
                        Temperature Log Form
                    </CardTitle>
                    <Separator />
                </CardHeader>
                
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-3">
                            <FormField
                                control={form.control}
                                name="temperature"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><Thermometer className=" text-blue-500" />  <span className={`text-center  text-blue-500 text-lg  ${poppin3.className}`}>Temperature (°C) </span></FormLabel>
                                        <FormControl >
                                            <Input type="number" placeholder="Enter temperature" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator />
                            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
