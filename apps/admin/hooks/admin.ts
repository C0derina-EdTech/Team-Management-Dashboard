"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { adminQueryBuilder } from "@/lib/admin-query";

axios.defaults.withCredentials = true;
const fetcher = (url: string) => axios.get(url).then(r => r.data);

interface AdminQueryOptions {
    apiPath: string;        // e.g. "/auth/admin/list-users"
    limit?: number;         // default 10
    filters?: string[];     // keys to initialize from URL
}

export function useAdminQuery<T = any>({
    apiPath,
    limit = 10,
    filters = ["email", "role"],
}: AdminQueryOptions) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Local state for filter values
    const initialState: Record<string, string> = {};
    filters.forEach((f) => (initialState[f] = searchParams.get(f) || ""));

    const [filterValues, setFilterValues] = useState(initialState);
    const [debouncedValues, setDebouncedValues] = useState(initialState);

    // Paging
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

    // useEffect(() => {
    //     const pageFromUrl = Number(searchParams.get('page')) || 1;
    //     if (pageFromUrl !== page) setPage(pageFromUrl);
    // }, [searchParams]);
    // Debounce all filter values
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValues(filterValues), 300);
        return () => clearTimeout(timer);
    }, [filterValues]);

    // Sync state → URL whenever filters or page change
    // useEffect(() => {
    //     const params = new URLSearchParams();

    //     filters.forEach((key) => {
    //         const value = debouncedValues[key];
    //         if (value && value !== "all") params.set(key, value);
    //     });

    //     params.set("page", String(page));
    //     params.set("limit", String(limit));

    //     router.replace(`?${params.toString()}`);
    // }, [debouncedValues, page, limit, router, filters]);
    useEffect(() => {
        const params = new URLSearchParams();

        filters.forEach((key) => {
            const value = debouncedValues[key];
            if (value && value !== "all") params.set(key, value);
        });

        params.set("page", String(page));
        params.set("limit", String(limit));

        const next = params.toString();
        const current = searchParams.toString();

        // Do NOT rewrite URL if nothing changed
        if (next === current) return;

        router.replace(`?${next}`);
    }, [debouncedValues, page, limit, router, filters, searchParams]);



    const swrKey = useMemo(() => {
        const keyObj = {
            ...debouncedValues,
            page,
            limit
        };

        return [
            apiPath,
            JSON.stringify(keyObj)
        ];
    }, [debouncedValues, page, limit]);

    const { data, error, mutate, isLoading } = useSWR(
        swrKey,
        ([path, queryStr]) => {
            const params = JSON.parse(queryStr!);
            const url = adminQueryBuilder(
                `${process.env.NEXT_PUBLIC_API_URL}${path}`,
                params
            );

            return fetcher(url);
        }
    );


    return {
        data,
        error,
        isLoading,
        mutate,
        page,
        setPage,
        filters: filterValues,
        setFilter: (key: string, val: string) => {
            setFilterValues((old) => ({ ...old, [key]: val }));
            setPage(1); // reset page on filter change
        },
    };
}
