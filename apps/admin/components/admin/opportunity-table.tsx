"use client";
import {
  CheckCircle,
  XCircle,
  Ban,
  Search,
  Users,
  Shield,
  User,
  UserPlus,
  CheckCheck,
  Plus,
  XSquare,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coderina-ams/ui/components/table";
import {
  Input
} from "@coderina-ams/ui/components/input";
import { Skeleton } from "@coderina-ams/ui/components/skeleton";

import { Badge } from "@coderina-ams/ui/components/badge";
import { Avatar, AvatarFallback } from "@coderina-ams/ui/components/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@coderina-ams/ui/components//select";

import { UserAddDialog } from "./user-add-dialog";
import { formatDateWithHr } from "@coderina-ams/ui/lib/utils";
import { PaginatedObjectList } from "../paginated-object-list";
import { OpportunityData } from "@coderina-ams/ui/lib/types";
import { OpportunityAddDialog } from "./opportunity-add-dialog";
import { OpportunitySourceActions } from "./user-actions";
import { Button } from "@coderina-ams/ui/components/button";
import { useOpportunityStore } from "@/hooks/opportunity";



export function OpportunityTable() {
  const searchParams = useSearchParams();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [status, setStatus] = useState(searchParams.get("status") || "active");



  const { getAll, items, meta, loading, error } = useOpportunityStore()

  // const handleActionComplete = () => {
  //   mutate();
  // };

  // const obj: OpportunityData = {
  //   applicationCount: 0,
  //   application_link: "",
  //   createdAt: "",
  //   deadline: "",
  //   description: "",
  //   id: "",
  //   name: "",
  //   requirements: [],
  //   status: "",
  //   tags: [],
  //   updatedAt: ""
  // }

  const Header = () => <TableHeader className="bg-muted sticky top-0 z-10">
    <TableRow>
      {[
        { label: "Name" },
        { label: "Status" },
        { label: "# of Applications" },
        { label: "Tags" },
        { label: "Link" },
        { label: "Created At" },
        { label: "Actions", className: "w-[80px]" },
      ].map((col) => (
        <TableHead
          key={col.label}
          className={[
            col.className,
            "px-4 py-3 text-xs font-medium text-muted-foreground",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {col.label}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>

  // Filter and sort controls
  const filterControls = (
    <div className="flex flex-wrap gap-2 items-end mb-2 w-full justify-between">
      <div className="flex gap-2 items-end">
        {/* Search by email */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search sources..."
            className="pl-8 pr-2 py-2 border rounded-md text-sm bg-background w-[200px]"
          // value={email}
          // onChange={(e) => {
          //   setEmail(e.target.value);
          //   setPage(1);
          // }}
          />
        </div>
        {/* Role select with icon */}
        <Select
          value={status}
        // onValueChange={(v) => {
        //   setRole(v);
        //   setPage(1);
        // }}
        >
          <SelectTrigger className="w-[140px] flex items-center gap-2">
            <span className="flex items-center gap-2">
              {status === "Active" ? (
                <CheckCheck className="w-4 h-4" />
              ) : status === "active" ? (
                <CheckCheck className="w-4 h-4" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              {status === "all"
                ? "All Status"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                All Status
              </span>
            </SelectItem>
            <SelectItem value="admin">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Active
              </span>
            </SelectItem>
            <SelectItem value="user">
              <span className="flex items-center gap-2">
                <XSquare className="w-4 h-4" />
                InActive
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="ml-auto bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium shadow-xs hover:bg-primary/90 transition-colors flex items-center gap-2"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="h-4 w-4" />
        Add new opportunity
      </Button>
    </div>
  );

  if (error) return <div>Failed to load opportunity</div>;
  if (!items)
    return (
      <div className="space-y-4 border-accent-foreground">
        {filterControls}
        <div className="overflow-hidden">
          <Table className="text-sm">
            <Header />
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-3 w-[160px]" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-6 w-[80px]" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-8 rounded-full" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-6 w-[60px]" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-4 w-[140px]" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-4 w-[140px]" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );


  console.log({ getAll, items, meta, loading, error })



  function handleActionComplete(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="space-y-4">
      {filterControls}
      <div className="overflow-hidden rounded-lg border-muted border-2 ">
        <Table className="text-sm ">
          <Header />
          <TableBody>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-3 w-[160px]" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-6 w-[80px]" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-8 rounded-full" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-6 w-[60px]" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-4 w-[140px]" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-4 w-[140px]" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                </TableRow>
              ))
              : items.map((opp: OpportunityData) => (
                <TableRow key={opp.id}>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="text-xs">
                          {opp.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {opp.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {opp.description.slice(0, 100)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {opp.status ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 flex items-center gap-1 px-2 py-1 text-xs"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700 flex items-center gap-1 px-2 py-1 text-xs"
                      >
                        <XCircle className="h-3 w-3" />
                        InActive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {opp.applicationCount}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex space-x-1">
                      {opp.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 flex items-center gap-1 px-2 py-1 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {opp.application_link}
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                    {formatDateWithHr(String(opp.createdAt))}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {/* <UserActions
                        user={opp ?? {}}
                        onActionComplete={handleActionComplete}
                      /> */}
                    <p>Actions</p>
                    {/* <OpportunitySourceActions
                      oppSource={opp ?? {}}
                      onActionComplete={handleActionComplete}
                    /> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4 py-1">
        <PaginatedObjectList getAll={getAll} meta={meta!} />
      </div>
      <OpportunityAddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      // onSuccess={() => mutate()}
      />
    </div>
  );
}
