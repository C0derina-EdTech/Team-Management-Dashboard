"use client";
import {
  CheckCircle,
  XCircle,
  Mail,
  Ban,
  Check,
  Search,
  Users,
  Shield,
  User,
  UserPlus,
  GithubIcon,
  GoalIcon,
} from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coderina-ams/ui/components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@coderina-ams/ui/components/tooltip";
import { Skeleton } from "@coderina-ams/ui/components/skeleton";

import { Badge } from "@coderina-ams/ui/components/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@coderina-ams/ui/components/avatar";
import { UserWithDetails } from "@/utils/users";
import { UserActions } from "./user-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@coderina-ams/ui/components//select";
import { UserAddDialog } from "./user-add-dialog";
import { formatDate, formatDateWithHr } from "@coderina-ams/ui/lib/utils";
import { useAdminQuery } from "@/hooks/admin";
import { PaginatedObjectList } from "@/components/paginated-object-list";




// Helper function to render account icons
const getAccountIcon = (account: string) => {
  switch (account) {
    case "credential":
      return <Mail className="h-4 w-4 dark:text-neutral-300" />;
    case "github":
      return <GithubIcon className="h-4 w-4 dark:text-neutral-300" />;
    case "google":
      return <GoalIcon className="h-4 w-4 dark:text-neutral-300" />;
    default:
      return null;
  }
};

export function TeamsTable() {

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const {
    data,
    isLoading,
    mutate,
    page,
    setPage,
    filters,
    error,
    setFilter
  } = useAdminQuery({
    apiPath: "/auth/admin/list-users",
    filters: ["email", "role"],
    limit: 10,
  });


  const handleActionComplete = () => {
    mutate();
  };

  // Filter and sort controls
  const filterControls = (
    <div className="flex flex-wrap gap-2 items-end mb-2 w-full justify-between">
      <div className="flex gap-2 items-end">
        {/* Search by email */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search email..."
            className="pl-8 pr-2 py-2 border rounded-md text-sm bg-background w-[200px]"
            value={filters.email}
            onChange={(e) => setFilter("email", e.target.value)}
          />
        </div>
        {/* Role select with icon */}
        <Select
          value={filters.role}
          onValueChange={(v) => {
            setFilter("role", v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[140px] flex items-center gap-2">
            <span className="flex items-center gap-2">
              {filters.role === "all" ? (
                <Users className="w-4 h-4" />
              ) : filters.role === "admin" ? (
                <Shield className="w-4 h-4" />
              ) : (
                <User className="w-4 h-4" />
              )}
              {filters.role === "all"
                ? "All Roles"
                : filters!.role!.charAt(0).toUpperCase() + filters.role!.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                All Roles
              </span>
            </SelectItem>
            <SelectItem value="admin">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin
              </span>
            </SelectItem>
            <SelectItem value="user">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                User
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button
        className="ml-auto bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium shadow-xs hover:bg-primary/90 transition-colors flex items-center gap-2"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <UserPlus className="h-4 w-4" />
        Add a team
      </button>
    </div>
  );

  if (error) return <div>Failed to load users</div>;
  if (!data)
    return (
      <div className="space-y-4 border-accent-foreground">
        {filterControls}
        <div className="overflow-hidden">
          <Table className="text-sm">
            <TableHeader>
              <TableRow>
                {[
                  { label: "Name" },
                  { label: "Verification" },
                  { label: "Linked Accounts" },
                  { label: "Role" },
                  { label: "Status" },
                  { label: "Last Sign In" },
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

  const { users, total, totalPages } = data;

  console.log({ users, total, totalPages })
  return (
    <div className="space-y-4">
      {filterControls}
      <div className="overflow-hidden rounded-lg border-muted border-2 ">
        <Table className="text-sm ">
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {[
                { label: "Name" },
                { label: "Verification" },
                { label: "Linked Accounts" },
                { label: "Role" },
                { label: "Status" },
                { label: "Last Sign In" },
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
          <TableBody>
            {isLoading
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
              : users.map((user: UserWithDetails) => (
                <TableRow key={user.id}>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.email.replace(/^[^@]+/, (match) =>
                            "*".repeat(match.length),
                          )}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {user.emailVerified ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 flex items-center gap-1 px-2 py-1 text-xs"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700 flex items-center gap-1 px-2 py-1 text-xs"
                      >
                        <XCircle className="h-3 w-3" />
                        Unverified
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {user.accounts?.map((account) => (
                        <div
                          key={account}
                          className="rounded-full bg-muted p-1.5 text-muted-foreground dark:bg-neutral-700"
                          title={account}
                        >
                          {getAccountIcon(account)}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 px-2 py-1 text-xs ${user.role === "admin"
                        ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700"
                        : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700"
                        }`}
                    >
                      {user.role === "admin" ? (
                        <Shield className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      {user.role
                        ? user.role.charAt(0).toUpperCase() +
                        user.role.slice(1)
                        : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {user.banned ? (
                      <div className="flex flex-col gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1 px-2 py-1 text-xs cursor-help"
                            >
                              <Ban className="h-3 w-3" />
                              Banned
                            </Badge>
                          </TooltipTrigger>
                          {user.banReason && (
                            <TooltipContent>
                              Reason: {user.banReason}
                            </TooltipContent>
                          )}
                        </Tooltip>
                        {user.banExpires && (
                          <span className="text-xs text-muted-foreground">
                            Expires: {formatDate(String(user.banExpires))}
                          </span>
                        )}
                      </div>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 flex items-center gap-1 px-2 py-1 text-xs"
                      >
                        <Check className="h-3 w-3" />
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                    {user.lastSignIn
                      ? formatDateWithHr(String(user.lastSignIn))
                      : "Never"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                    {formatDateWithHr(String(user.createdAt))}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <UserActions
                      user={user}
                      onActionComplete={handleActionComplete}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-between px-4 py-1">
        <div className="text-sm text-muted-foreground">
          Showing {users.length} of {total} users
        </div>
        {renderPagination()}
      </div> */}
      <PaginatedObjectList getAll={(page, pageSize) => console.log(page, pageSize)} meta={data.meta!} />
      <UserAddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={() => mutate()}
      />
    </div>
  );
}
