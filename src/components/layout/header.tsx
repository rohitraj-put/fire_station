
import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useFireStation } from "@/context/FireStationContext";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/theme-toggle";

interface HeaderProps {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}

export function Header({ showMobileMenu, setShowMobileMenu }: HeaderProps) {
  const [notifications, setNotifications] = useState(3);
  const { incidents } = useFireStation();

  const activeIncidents = incidents.filter(
    (incident) => incident.status !== "resolved" && incident.status !== "closed"
  ).length;

  return (
    <header className={cn(
      "bg-background border-b h-14 px-4 flex items-center justify-between sticky top-0 z-30",
      activeIncidents > 0 ? "border-firebrick-500" : "border-border"
    )}>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2 bg-accent text-white"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-[200px] bg-background md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {activeIncidents > 0 && (
          <div className="hidden md:flex items-center">
            <div className="animate-pulse bg-firebrick-500 rounded-full h-2 w-2 mr-2"></div>
            <span className="text-sm font-medium">
              {activeIncidents} Active {activeIncidents === 1 ? "Incident" : "Incidents"}
            </span>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-firebrick-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">Equipment maintenance due</span>
                <span className="text-xs text-muted-foreground">
                  Thermal camera needs inspection
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">New incident report</span>
                <span className="text-xs text-muted-foreground">
                  Incident #1204 has been filed
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">Shift change reminder</span>
                <span className="text-xs text-muted-foreground">
                  B-Shift starts tomorrow at 08:00
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-1 items-center justify-between">
          
          <ThemeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer ">
              <AvatarImage className="object-cover" src="https://cdn.pixabay.com/photo/2020/07/08/19/13/girl-5384878_1280.jpg" alt="User" />
              <AvatarFallback>FS</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Megha Rajput</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
