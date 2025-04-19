
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";


interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center h-14 border-b border-sidebar-border px-3">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          {collapsed ? (
            <Flame className="h-6 w-6 text-firebrick-500" />
          ) : (
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-firebrick-500" />
              <span className="font-bold text-2xl text-white">Fire Station</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {collapsed ? (
          <div className="flex flex-col items-center space-y-4 py-4">
            {/* Icons only when collapsed */}
            <Flame className="h-8 w-5 text-sidebar-foreground" />
            <div className="h-8 w-5 text-sidebar-foreground flex items-center justify-center">👥</div>
            <div className="h-8 w-5 text-sidebar-foreground flex items-center justify-center">🚒</div>
            <div className="h-8 w-5 text-sidebar-foreground flex items-center justify-center">⚒️</div>
            <div className="h-8 w-5 text-sidebar-foreground flex items-center justify-center">⚠️</div>
            <div className="h-8 w-5 text-sidebar-foreground flex items-center justify-center">📅</div>
            <div className="h-8 w-5 text-sidebar-foreground flex items-center justify-center">📚</div>
            <div className="h-8 w-5 text-sidebar-foreground flex items-center justify-center">📋</div>
            <div className="h-8 w-5 text-sidebar-foreground flex items-center justify-center">⚙️</div>
          </div>
        ) : (
          <SidebarNav />
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="self-end m-2 bg-accent max-md:hidden"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  );
}
