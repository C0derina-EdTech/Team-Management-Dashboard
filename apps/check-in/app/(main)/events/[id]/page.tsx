"use client"
import { EventDetails } from "@coderina-ams/ui/components/event-details";
import { Skeleton } from "@coderina-ams/ui/components/skeleton";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const { id } = useParams<{ id: string; }>()



  return (
    <div className="container mx-auto space-y-6 px-4 py-10">

      <Suspense fallback={<Skeleton />}>
        <EventDetails id={id} />
      </Suspense>
    </div>
  );
}