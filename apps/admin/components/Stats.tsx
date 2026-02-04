"use client"
import { useDashboardStore } from "@/hooks/dashboard";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { SectionCards } from "./section-cards";
import { useEffect } from "react";

export function DashboardStats() {
    const { dashboardData, loading, error, getStats } = useDashboardStore()
    const { applications } = dashboardData ?? {}
    console.log({ applications, dashboardData, loading, error })

    useEffect(() => {
        getStats()
    }, [])
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards stats={applications} />
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive stats={applications} />
            </div>
        </div>
    );
}