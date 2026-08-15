import { Bell, Check, LogOut, Search, Settings, Sparkles, User } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { currentUser } from "@/lib/sample-data";

const notifications = [
  { title: "Training complete", detail: "Churn Prediction Q3 · 94.2% accuracy", time: "12m" },
  { title: "Cleaning plan ready", detail: "11 recommendations await approval", time: "51m" },
  { title: "Schema drift detected", detail: "store_sales_2024.csv gained 2 columns", time: "3h" },
];

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <div className="relative hidden flex-1 md:block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search projects, datasets, models…"
          aria-label="Search"
          className="h-10 w-full max-w-md rounded-xl border border-border bg-surface pr-16 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/30"
        />
        <kbd className="pointer-events-none absolute top-1/2 left-[22.5rem] hidden -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground lg:block">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden rounded-xl sm:inline-flex">
          <Sparkles className="size-4 text-primary" />
          Ask copilot
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-xl" aria-label="Notifications">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">Notifications</p>
              <Badge variant="secondary" className="rounded-full">
                3 new
              </Badge>
            </div>
            <ul className="divide-y divide-border">
              {notifications.map((n) => (
                <li key={n.title} className="flex gap-3 px-4 py-3 transition-colors hover:bg-accent/50">
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.detail}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{n.time}</span>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-xl border border-border bg-surface py-1.5 pr-3 pl-1.5 transition-colors hover:bg-accent"
              aria-label="Account menu"
            >
              <Avatar className="size-7">
                <AvatarFallback className="bg-gradient-brand text-xs font-semibold text-primary-foreground">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:block">{currentUser.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs font-normal text-muted-foreground">{currentUser.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="size-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4" /> Workspace settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="size-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
