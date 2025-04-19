
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Flame, 
  Users, 
  Truck, 
  Wrench, 
  ClipboardList, 
  LayoutDashboard,
  Calendar,
  ShieldAlert,
  Settings,
  BookOpen
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Incidents",
    href: "/incidents",
    icon: Flame,
  },
  {
    title: "Personnel",
    href: "/personnel",
    icon: Users,
  },
  {
    title: "Vehicles",
    href: "/vehicles",
    icon: Truck,
  },
  {
    title: "Equipment",
    href: "/equipment",
    icon: Wrench,
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: ShieldAlert,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Training",
    href: "/training",
    icon: BookOpen,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function SidebarNav() {
  const location = useLocation();
  
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
