import type { Metadata } from "next";
import { UsersTable } from "@/components/admin/users-table";
import { Suspense } from "react";
import { Spinner } from "@coderina-ams/ui/components/spinner";

export const metadata: Metadata = {
  title: "Teams | Admin Dashboard",
  description: "Manage teams in the admin dashboard",
};

export default function UsersPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <UsersTable />
      </div>
    </Suspense>
  );
}
