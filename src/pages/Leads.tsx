import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LeadTable } from "@/components/leads/LeadTable";
import { LeadFilters, LeadFiltersState } from "@/components/leads/LeadFilters";
import { LeadDrawer } from "@/components/leads/LeadDrawer";
import { LeadStats } from "@/components/leads/LeadStats";
import { Lead } from "@/types/dashboard";
import { mockUnsubEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCw } from "lucide-react";

// Extract unique leads from mock data
const allLeads: Lead[] = mockUnsubEvents.map((e) => e.lead);

// Get unique values for filters
const uniquePipelines = [...new Set(allLeads.map((l) => l.pipeline))];
const uniqueSources = [...new Set(allLeads.map((l) => l.source))];
const uniqueLeadTypes = [...new Set(allLeads.map((l) => l.lead_type))];
const uniqueStatuses = [...new Set(allLeads.map((l) => l.status))];

export default function Leads() {
  const [filters, setFilters] = useState<LeadFiltersState>({
    search: "",
    pipeline: [],
    source: [],
    leadType: [],
    status: [],
  });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredLeads = useMemo(() => {
    return allLeads.filter((lead) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          lead.full_name.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower) ||
          lead.phone.includes(filters.search);
        if (!matchesSearch) return false;
      }

      // Pipeline filter
      if (filters.pipeline.length > 0 && !filters.pipeline.includes(lead.pipeline)) {
        return false;
      }

      // Source filter
      if (filters.source.length > 0 && !filters.source.includes(lead.source)) {
        return false;
      }

      // Lead type filter
      if (filters.leadType.length > 0 && !filters.leadType.includes(lead.lead_type)) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(lead.status)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  return (
    <AppShell pageTitle="Leads">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Lead Database</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and view all your contacts in one place
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Stats */}
        <LeadStats leads={filteredLeads} />

        {/* Filters */}
        <LeadFilters
          filters={filters}
          onFiltersChange={setFilters}
          pipelines={uniquePipelines}
          sources={uniqueSources}
          leadTypes={uniqueLeadTypes}
          statuses={uniqueStatuses}
        />

        {/* Table */}
        <LeadTable leads={filteredLeads} onRowClick={handleRowClick} />
      </div>

      {/* Lead Detail Drawer */}
      <LeadDrawer
        lead={selectedLead}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </AppShell>
  );
}
