import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PipelineStageChartProps {
  data: Array<{
    stage: string;
    count: number;
    mass?: number;
    manual?: number;
    auto?: number;
  }>;
  onStageClick?: (stage: string) => void;
}

export const PipelineStageChart = ({ data, onStageClick }: PipelineStageChartProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Pipeline Stage at Unsubscribe</h3>
          <p className="text-sm text-muted-foreground">Click any bar to filter by that stage</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={data}
            onClick={(e) => e?.activeLabel && onStageClick?.(e.activeLabel)}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="stage" 
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
            <Bar dataKey="mass" stackId="a" fill="hsl(var(--chart-1))" name="Mass Email" cursor="pointer" />
            <Bar dataKey="manual" stackId="a" fill="hsl(var(--chart-2))" name="Manual" cursor="pointer" />
            <Bar dataKey="auto" stackId="a" fill="hsl(var(--chart-3))" name="Auto" cursor="pointer" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
