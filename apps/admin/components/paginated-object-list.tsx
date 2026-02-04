"use client"

import { Suspense, useEffect } from "react";
import { usePagination } from "@coderina-ams/ui/hooks/use-pagination";
import { PaginationMeta } from "@coderina-ams/ui/components/data-table";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PaginationMetaProps } from "@coderina-ams/ui/lib/types";
import { Skeleton } from "@coderina-ams/ui/components/skeleton";

export function PaginatedObjectList({ getAll, meta }: { getAll: (page: number, pageSize: number) => void, meta: PaginationMetaProps }) {

  const searchParams = useSearchParams();
  const router = useRouter();

  const pageFromUrl = Number(searchParams.get("page") ?? 1);
  const sizeFromUrl = Number(searchParams.get("pageSize") ?? 10);

  const path = usePathname(); // From next/navigation



  const pagination = usePagination(
    {
      page: pageFromUrl,
      pageSize: sizeFromUrl,
      total: meta?.total ?? 0,
    },
    getAll, // auto fetch on pagination change
    (page, pageSize) => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
      router.replace(`?${params.toString()}`);
    }
  );

  // console.log({ items, loading, getAll, meta, pagination })

  /** Sync total to pagination */
  useEffect(() => {
    if (meta?.total) pagination.setTotal(meta.total);
  }, [meta]);

  return (
    <div className="my-3">
      <PaginationMeta pagination={pagination} />
    </div>
  );
}


