import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface UnsubsByAgentChartProps {
  data: Array<{
    name: string;
    agentId: string;
    count: number;
    rate: number;
  }>;
  onAgentClick?: (agentId: string) => void;
}

export const UnsubsByAgentChart = ({ data, onAgentClick }: UnsubsByAgentChartProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Unsubscribes by Agent</h3>
          <p className="text-sm text-muted-foreground">Click any bar to filter by that agent</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={data} 
            layout="vertical"
            onClick={(e) => e?.activePayload?.[0]?.payload?.agentId && onAgentClick?.(e.activePayload[0].payload.agentId)}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              type="number" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              width={120}
            />
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
                ''
              ]}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} cursor="pointer">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(var(--chart-${(index % 6) + 1}))`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
