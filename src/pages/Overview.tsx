import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/overview/StatCard";
import { SectionHeader } from "@/components/overview/SectionHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingDown, 
  Mail, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  User
} from "lucide-react";

// Mock data
const performanceData = [
  { date: 'Jan 15', sends: 2400, opens: 2100, unsubs: 48 },
  { date: 'Jan 22', sends: 2800, opens: 2450, unsubs: 52 },
  { date: 'Jan 29', sends: 3200, opens: 2850, unsubs: 61 },
  { date: 'Feb 5', sends: 2900, opens: 2600, unsubs: 55 },
  { date: 'Feb 12', sends: 3100, opens: 2750, unsubs: 58 },
  { date: 'Feb 19', sends: 3400, opens: 3050, unsubs: 64 },
];

const agentData = [
  { agent: 'Sarah Chen', count: 28, rate: 2.1 },
  { agent: 'Mike Torres', count: 34, rate: 2.8 },
  { agent: 'Alex Rivera', count: 19, rate: 1.6 },
  { agent: 'Jordan Lee', count: 42, rate: 3.2 },
  { agent: 'Casey Kim', count: 15, rate: 1.3 },
];

const priorityAgents = [
  { name: 'Jordan Lee', issue: 'Unsub 2.3× org avg', metric: '3.2%', status: 'critical' },
  { name: 'Mike Torres', issue: 'High unsub rate', metric: '2.8%', status: 'warning' },
  { name: 'Alex Rivera', issue: 'Low response time', metric: '4.2h avg', status: 'warning' },
];

const riskCampaigns = [
  { subject: 'New Listings This Week', unsubRate: 4.2, reach: 1240 },
  { subject: 'Market Update February', unsubRate: 3.8, reach: 980 },
  { subject: 'Open House Invitations', unsubRate: 3.1, reach: 750 },
];

export default function Overview() {
  return (
    <AppShell pageTitle="Overview" userRole="leadership">
      <div className="px-6 lg:px-10 py-8 max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            Overview
          </h1>
          <p className="text-sm text-slate-600">
            Today's signal for your organization.
          </p>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <StatCard
            label="Total Active Leads"
            value="847"
            trendValue="+12%"
            trendDirection="up"
            onClick={() => console.log('Filter to active leads')}
          />
          <StatCard
            label="Unsubscribe Rate"
            value="2.1%"
            trendValue="-0.3%"
            trendDirection="down"
            chipLabel="Org"
            onClick={() => console.log('View unsub intelligence')}
          />
          <StatCard
            label="Avg Response Time"
            value="2.4h"
            trendValue="-15%"
            trendDirection="down"
          />
          <StatCard
            label="Top Campaign"
            value="94%"
            chipLabel="Open Rate"
            onClick={() => console.log('View campaign')}
          />
          <StatCard
            label="At-Risk Source"
            value="Zillow"
            trendValue="3.8%"
            trendDirection="up"
            onClick={() => console.log('Filter by source')}
          />
        </div>

        {/* Charts Band */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Performance Over Time */}
          <div className="chart-container">
            <SectionHeader
              eyebrow="TRENDS"
              title="Org Performance Over Time"
              action={
                <Button variant="ghost" size="sm" className="text-xs">
                  View details
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              }
            />
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="sends" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={false}
                  name="Sends"
                />
                <Line 
                  type="monotone" 
                  dataKey="opens" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  dot={false}
                  name="Opens"
                />
                <Line 
                  type="monotone" 
                  dataKey="unsubs" 
                  stroke="hsl(var(--chart-5))" 
                  strokeWidth={2}
                  dot={false}
                  name="Unsubs"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Unsubs by Agent */}
          <div className="chart-container">
            <SectionHeader
              eyebrow="AGENTS"
              title="Unsubs by Agent (Top 5)"
              action={
                <Button variant="ghost" size="sm" className="text-xs">
                  View all agents
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              }
            />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={agentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis 
                  dataKey="agent" 
                  type="category" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number, name: string, props: any) => {
                    if (name === 'count') {
                      return [`${value} unsubs (${props.payload.rate}%)`, 'Unsubscribes'];
                    }
                    return [value, name];
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Band */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agents Needing Attention */}
          <div className="surface rounded-2xl p-6">
            <SectionHeader
              eyebrow="ALERTS"
              title="Agents Needing Attention"
              action={
                <Badge variant="secondary" className="text-xs">
                  3 alerts
                </Badge>
              }
            />
            <div className="space-y-3">
              {priorityAgents.map((agent, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200/60 hover:bg-slate-50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{agent.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        <span className="text-xs text-slate-600">{agent.issue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={agent.status === 'critical' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {agent.metric}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Risk Campaigns */}
          <div className="surface rounded-2xl p-6">
            <SectionHeader
              eyebrow="CAMPAIGNS"
              title="Top Risk Campaigns"
              action={
                <Button variant="ghost" size="sm" className="text-xs">
                  View all
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              }
            />
            <div className="space-y-3">
              {riskCampaigns.map((campaign, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200/60 hover:bg-slate-50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">
                        {campaign.subject}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {campaign.reach.toLocaleString()} recipients
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive" className="text-xs">
                      {campaign.unsubRate}% unsub
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
