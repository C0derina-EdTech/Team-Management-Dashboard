import EventsList from "@coderina-ams/ui/components/events-list"
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Events | Admin Dashboard",
    description: "Manage events in the admin dashboard",
};

export default function Page() {
    return (
        <EventsList />
    )
}
