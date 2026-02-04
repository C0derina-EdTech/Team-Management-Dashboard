import { DashboardData } from "@coderina-ams/ui/lib/types";
import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

type DashboardState = {
    dashboardData: DashboardData;
    loading: boolean;
    error: string | null;
    getStats: () => Promise<void>;
    // getGraphData: () => dashboardData | null;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    dashboardData: {} as DashboardData,
    loading: false,
    error: null,
    getStats: async () => {
        set({ loading: true, error: null });

        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/stats`);

            set({
                dashboardData: data,
                loading: false,
            });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Unknown error",
                loading: false,
            });
        }
    },
    getGraphData: () => {
        return null
    },
}));