import { useState, useMemo } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { UnsubsOverTimeChart } from "@/components/dashboard/UnsubsOverTimeChart";
import { UnsubsByAgentChart } from "@/components/dashboard/UnsubsByAgentChart";
import { UnsubsBySourceChart } from "@/components/dashboard/UnsubsBySourceChart";
import { PipelineStageChart } from "@/components/dashboard/PipelineStageChart";
import { TimeToUnsubChart } from "@/components/dashboard/TimeToUnsubChart";
import { DetailTable } from "@/components/dashboard/DetailTable";
import { LeadDetailDrawer } from "@/components/dashboard/LeadDetailDrawer";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { DashboardFilters, UnsubEvent } from "@/types/dashboard";
import { mockAgents, mockUnsubEvents } from "@/data/mockData";
import { TrendingUp, Users, Mail, Clock, Eye, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: '30d',
    agents: [],
    leadTypes: [],
    pipelines: [],
    sources: [],
    emailType: 'all',
  });

  const [selectedEvent, setSelectedEvent] = useState<UnsubEvent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filter data based on current filters
  const filteredEvents = useMemo(() => {
    return mockUnsubEvents.filter(event => {
      if (filters.agents.length > 0 && !filters.agents.includes(event.agent_id)) return false;
      if (filters.sources.length > 0 && !filters.sources.includes(event.lead.source)) return false;
      if (filters.emailType !== 'all' && event.metadata.email_type !== filters.emailType) return false;
      return true;
    });
  }, [filters]);

  // Calculate KPIs
  const totalUnsubs = filteredEvents.length;
  const unsubRate = 2.8; // Mock calculation
  const avgEmailsBeforeUnsub = Math.round(
    filteredEvents.reduce((sum, e) => sum + e.emailsSentBefore, 0) / filteredEvents.length
  );
  const avgDaysToUnsub = Math.round(
    filteredEvents.reduce((sum, e) => sum + e.daysFromRegToUnsub, 0) / filteredEvents.length
  );
  const avgOpenRate = 42; // Mock calculation
  const topTriggerSubject = "Our Journey Continues: Donald, Meet Realty Haus Group";

  // Prepare chart data
  const unsubsOverTime = useMemo(() => {
    const grouped = filteredEvents.reduce((acc, event) => {
      const date = new Date(event.occurred_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([date, count]) => ({ date, count })).slice(-30);
  }, [filteredEvents]);

  const unsubsByAgent = useMemo(() => {
    const grouped = filteredEvents.reduce((acc, event) => {
      const name = event.agent.name;
      acc[name] = (acc[name] || { count: 0, agentId: event.agent_id });
      acc[name].count++;
      return acc;
    }, {} as Record<string, { count: number; agentId: string }>);

    return Object.entries(grouped).map(([name, data]) => ({
      name,
      agentId: data.agentId,
      count: data.count,
      rate: Number(((data.count / 100) * 100).toFixed(1)),
    })).sort((a, b) => b.count - a.count);
  }, [filteredEvents]);

  const unsubsBySource = useMemo(() => {
    const grouped = filteredEvents.reduce((acc, event) => {
      const source = event.lead.source;
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      rate: Number(((value / filteredEvents.length) * 100).toFixed(1)),
    }));
  }, [filteredEvents]);

  const pipelineStageData = useMemo(() => {
    const grouped = filteredEvents.reduce((acc, event) => {
      const stage = event.lead.pipeline;
      if (!acc[stage]) acc[stage] = { stage, mass: 0, manual: 0, auto: 0, count: 0 };
      
      const emailType = event.metadata.email_type;
      if (emailType === 'mass') acc[stage].mass++;
      else if (emailType === 'manual') acc[stage].manual++;
      else if (emailType === 'auto') acc[stage].auto++;
      acc[stage].count++;
      
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped);
  }, [filteredEvents]);

  const timeToUnsubData = useMemo(() => {
    const buckets = {
      '0-7 days': 0,
      '8-30 days': 0,
      '31-90 days': 0,
      '91-180 days': 0,
      '181-365 days': 0,
      '365+ days': 0,
    };

    filteredEvents.forEach(event => {
      const days = event.daysFromRegToUnsub;
      if (days <= 7) buckets['0-7 days']++;
      else if (days <= 30) buckets['8-30 days']++;
      else if (days <= 90) buckets['31-90 days']++;
      else if (days <= 180) buckets['91-180 days']++;
      else if (days <= 365) buckets['181-365 days']++;
      else buckets['365+ days']++;
    });

    return Object.entries(buckets).map(([bucket, count]) => ({ bucket, count }));
  }, [filteredEvents]);

  const handleRowClick = (event: UnsubEvent) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  const handleAgentFilter = (agentId: string) => {
    setFilters(prev => ({
      ...prev,
      agents: prev.agents.includes(agentId) 
        ? prev.agents.filter(id => id !== agentId)
        : [...prev.agents, agentId]
    }));
  };

  const handleSourceFilter = (source: string) => {
    setFilters(prev => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter(s => s !== source)
        : [...prev.sources, source]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold">Unsubscribe Intelligence</h1>
          <p className="text-muted-foreground mt-1">Monitor email performance & list health</p>
        </div>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} onFiltersChange={setFilters} agents={mockAgents} />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard
            title="Total Unsubscribes"
            value={totalUnsubs}
            trend={{ value: 12, direction: 'up' }}
            onClick={() => setFilters({ ...filters, agents: [], sources: [] })}
          />
          <KPICard
            title="Unsubscribe Rate"
            value={`${unsubRate}%`}
            status={unsubRate < 2 ? 'good' : unsubRate < 4 ? 'warning' : 'critical'}
            subtitle="Of total emails sent"
          />
          <KPICard
            title="Avg Emails Before Unsub"
            value={avgEmailsBeforeUnsub}
            subtitle="Engagement before leaving"
          />
          <KPICard
            title="Avg Days to Unsub"
            value={avgDaysToUnsub}
            subtitle="From registration"
          />
          <KPICard
            title="Open Rate Before Unsub"
            value={`${avgOpenRate}%`}
            subtitle="Engagement level"
            status="good"
          />
          <KPICard
            title="Top Trigger Email"
            value="12 unsubs"
            subtitle={topTriggerSubject}
            onClick={() => setFilters({ ...filters, emailSubject: topTriggerSubject })}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UnsubsOverTimeChart 
            data={unsubsOverTime} 
            onDateClick={(date) => console.log('Filter by date:', date)}
          />
          <UnsubsByAgentChart 
            data={unsubsByAgent}
            onAgentClick={handleAgentFilter}
          />
          <UnsubsBySourceChart 
            data={unsubsBySource}
            onSourceClick={handleSourceFilter}
          />
          <PipelineStageChart 
            data={pipelineStageData}
            onStageClick={(stage) => console.log('Filter by stage:', stage)}
          />
          <TimeToUnsubChart 
            data={timeToUnsubData}
            onBucketClick={(bucket) => console.log('Filter by bucket:', bucket)}
          />
          <InsightsPanel />
        </div>

        {/* Detail Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Unsubscribe Details</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredEvents.length} events • Click any row for details
            </p>
          </div>
          <DetailTable data={filteredEvents} onRowClick={handleRowClick} />
        </div>
      </div>

      {/* Lead Detail Drawer */}
      <LeadDetailDrawer 
        event={selectedEvent}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
};

export default Dashboard;
