import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface UnsubsBySourceChartProps {
  data: Array<{
    name: string;
    value: number;
    rate: number;
  }>;
  onSourceClick?: (source: string) => void;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
];

export const UnsubsBySourceChart = ({ data, onSourceClick }: UnsubsBySourceChartProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Unsubscribes by Source</h3>
          <p className="text-sm text-muted-foreground">Click any segment to filter by that source</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onClick={(entry) => onSourceClick?.(entry.name)}
              cursor="pointer"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: any, name: string, props: any) => [
                <div key="tooltip" className="space-y-1">
                  <div>{value} unsubscribes</div>
                  <div className="text-xs text-muted-foreground">Rate: {props.payload.rate}%</div>
                </div>,
                name
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
