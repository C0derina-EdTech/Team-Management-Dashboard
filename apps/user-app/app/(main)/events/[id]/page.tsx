"use client"
import { CheckIn } from "@/components/check-in";
import { EventDetails } from "@/components/event-details";
import { BackLink } from "@/components/misc";
import { Button } from "@coderina-ams/ui/components/button";
import { Skeleton } from "@coderina-ams/ui/components/skeleton";
import { useParams } from "next/navigation";
import { JSX, Suspense, useEffect } from "react";

export default function Page() {
  const { id } = useParams<{ id: string; }>()



  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <BackLink href={"/events"} text={"Events"} />
      <Suspense fallback={<Skeleton />}>
        <div className="">
          <div className="flex items-center justify-between my-4">
            <h1 className="text-2xl font-bold">Event Details</h1>
            <CheckIn />
          </div>
          <EventDetails />
        </div>
      </Suspense>
    </div>
  );
}