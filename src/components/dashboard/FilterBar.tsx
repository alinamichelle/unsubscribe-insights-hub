import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, Users, Tag, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardFilters } from "@/types/dashboard";

interface FilterBarProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  agents: Array<{ id: string; name: string }>;
}

export const FilterBar = ({ filters, onFiltersChange, agents }: FilterBarProps) => {
  const removeAgent = (agentId: string) => {
    onFiltersChange({
      ...filters,
      agents: filters.agents.filter(id => id !== agentId),
    });
  };

  const removeSource = (source: string) => {
    onFiltersChange({
      ...filters,
      sources: filters.sources.filter(s => s !== source),
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      dateRange: '30d',
      agents: [],
      leadTypes: [],
      pipelines: [],
      sources: [],
      emailType: 'all',
    });
  };

  const hasActiveFilters = filters.agents.length > 0 || 
    filters.sources.length > 0 || 
    filters.leadTypes.length > 0 || 
    filters.pipelines.length > 0 ||
    filters.emailType !== 'all';

  return (
    <div className="bg-card border-b border-border px-6 py-4 space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select
            value={filters.dateRange}
            onValueChange={(value: any) => onFiltersChange({ ...filters, dateRange: value })}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Email Type:</span>
          <div className="flex gap-2">
            {(['all', 'mass', 'manual'] as const).map((type) => (
              <Button
                key={type}
                variant={filters.emailType === type ? "default" : "outline"}
                size="sm"
                onClick={() => onFiltersChange({ ...filters, emailType: type })}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset filters
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.agents.map(agentId => {
            const agent = agents.find(a => a.id === agentId);
            return agent ? (
              <Badge key={agentId} variant="secondary" className="gap-1">
                <Users className="h-3 w-3" />
                {agent.name}
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeAgent(agentId)} />
              </Badge>
            ) : null;
          })}
          {filters.sources.map(source => (
            <Badge key={source} variant="secondary" className="gap-1">
              <Tag className="h-3 w-3" />
              {source}
              <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeSource(source)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
