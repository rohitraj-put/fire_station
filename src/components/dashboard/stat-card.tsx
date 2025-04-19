
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, description, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className="flex items-center pt-1">
                <div
                  className={cn(
                    "text-xs font-medium",
                    trend.positive ? "text-green-500" : "text-firebrick-500"
                  )}
                >
                  {trend.positive ? "↑" : "↓"} {trend.value}%
                </div>
                <div className="text-xs text-muted-foreground ml-1">
                  {trend.label}
                </div>
              </div>
            )}
          </div>
          <div className={cn(
            "p-2 rounded-full",
            title.includes("incident") || title.includes("Incident") ? 
              "bg-firebrick-100" : "bg-navy-100"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
