import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeToUnsubChartProps {
  data: Array<{
    bucket: string;
    count: number;
  }>;
  onBucketClick?: (bucket: string) => void;
}

export const TimeToUnsubChart = ({ data, onBucketClick }: TimeToUnsubChartProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Time-to-Unsubscribe Distribution</h3>
          <p className="text-sm text-muted-foreground">Days from registration to unsubscribe</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={data}
            onClick={(e) => e?.activeLabel && onBucketClick?.(e.activeLabel)}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="bucket" 
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
            <Bar 
              dataKey="count" 
              fill="hsl(var(--chart-1))" 
              radius={[4, 4, 0, 0]}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
