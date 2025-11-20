import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface UnsubsOverTimeChartProps {
  data: Array<{
    date: string;
    count: number;
    byAgent?: Record<string, number>;
  }>;
  onDateClick?: (date: string) => void;
}

export const UnsubsOverTimeChart = ({ data, onDateClick }: UnsubsOverTimeChartProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Unsubscribes Over Time</h3>
          <p className="text-sm text-muted-foreground">Click any point to filter by that date range</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} onClick={(e) => e?.activeLabel && onDateClick?.(e.activeLabel)}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Unsubscribes"
              dot={{ fill: 'hsl(var(--chart-1))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
