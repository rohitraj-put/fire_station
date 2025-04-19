
import { useFireStation } from "@/context/FireStationContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function ActivityChart() {
  const { dashboardSummary } = useFireStation();
  const { dailyStats } = dashboardSummary;

  // Format date for display
  const formattedData = dailyStats.map(item => {
    const date = new Date(item.date);
    return {
      ...item,
      formattedDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  return (
    <Card className="w-1/2 max-md:w-full">
      <CardHeader className="pb-2">
        <CardTitle>Incident Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="formattedDate" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="incidents" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorIncidents)" 
                activeDot={{ r: 8 }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
