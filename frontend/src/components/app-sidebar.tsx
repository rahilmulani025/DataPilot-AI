import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UploadCloud,
  Table2,
  ListChecks,
  ChartScatter,
  Cpu,
  Trophy,
  Lightbulb,
  Sparkles,
  MessagesSquare,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Upload Dataset", url: "/upload", icon: UploadCloud },
    ],
  },
  {
    label: "Data pipeline",
    items: [
      { title: "Dataset Summary", url: "/dataset", icon: Table2 },
      { title: "Cleaning Approval", url: "/cleaning", icon: ListChecks },
      { title: "EDA Dashboard", url: "/eda", icon: ChartScatter },
    ],
  },
  {
    label: "Modeling",
    items: [
      { title: "Model Training", url: "/training", icon: Cpu },
      { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
      { title: "Explainability", url: "/explainability", icon: Lightbulb },
    ],
  },
  {
    label: "Delivery",
    items: [
      { title: "Business Insights", url: "/insights", icon: Sparkles },
      { title: "Chat With Data", url: "/chat", icon: MessagesSquare },
      { title: "Reports", url: "/reports", icon: FileText },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <span className="bg-gradient-brand flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold tracking-tight text-primary-foreground">
            DP
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-semibold">DataPilot AI</span>
              <span className="block truncate text-xs text-muted-foreground">Data science copilot</span>
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-1">
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[0.68rem] tracking-[0.14em] uppercase text-muted-foreground/70">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                        <Link to={item.url} className="group/nav gap-3">
                          <item.icon
                            className={
                              active
                                ? "size-4 text-primary"
                                : "size-4 text-muted-foreground transition-colors group-hover/nav:text-foreground"
                            }
                          />
                          <span className="truncate text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="surface-panel p-3">
            <p className="text-xs font-medium">Workspace usage</p>
            <p className="mt-1 text-xs text-muted-foreground">68 of 100 compute hours used</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="bg-gradient-brand h-full w-[68%] rounded-full" />
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
