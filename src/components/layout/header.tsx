"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ThemeSwitcher } from "../theme-switcher";
import { Bell, Search, MessageSquare, Menu } from "lucide-react";
import { RoleSwitcher } from "../role-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  onMenuToggle?: () => void;
  onRoleChange?: (role: string) => void;
}

export function Header({
  user = {
    name: "John Farmer",
    email: "john@agrohub.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    role: "farmer",
  },
  onMenuToggle = () => {},
  onRoleChange = () => {},
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">AgroHub</span>
          </div>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for farmers, products, posts..."
              className="w-full pl-8"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <RoleSwitcher currentRole={user.role} onRoleChange={onRoleChange} />
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5 md:hidden" />
            <span className="sr-only">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => router.push("/messages")}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <ThemeSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/login")}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

const Leaf = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 22c1.25-1.25 2.5-2.5 3.5-4 .83-1.25 1.5-2.5 2-4 .5-1.5.5-3 .5-4.5s.08-3 1-4c.92-1 2-1.5 3-1.5s2.17.08 3 1c.83.92 1 2.5 1 4 0 1.5 0 3 .5 4.5.5 1.5 1.17 2.75 2 4 1 1.5 2.25 2.75 3.5 4" />
    <path d="M12 22c-1.5-1-3-2.5-4.5-4.5S5 13 5 9.5C5 6 6.5 4 9.5 4c1 0 2 .5 2.5 1.5" />
    <path d="M12 22c1.5-1 3-2.5 4.5-4.5S19 13 19 9.5C19 6 17.5 4 14.5 4c-1 0-2 .5-2.5 1.5" />
  </svg>
);
