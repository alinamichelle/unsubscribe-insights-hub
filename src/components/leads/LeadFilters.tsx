import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface LeadFiltersState {
  search: string;
  pipeline: string[];
  source: string[];
  leadType: string[];
  status: string[];
}

interface LeadFiltersProps {
  filters: LeadFiltersState;
  onFiltersChange: (filters: LeadFiltersState) => void;
  pipelines: string[];
  sources: string[];
  leadTypes: string[];
  statuses: string[];
}

export function LeadFilters({
  filters,
  onFiltersChange,
  pipelines,
  sources,
  leadTypes,
  statuses,
}: LeadFiltersProps) {
  const activeFilterCount =
    filters.pipeline.length +
    filters.source.length +
    filters.leadType.length +
    filters.status.length;

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const toggleFilter = (
    key: keyof Omit<LeadFiltersState, "search">,
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      pipeline: [],
      source: [],
      leadType: [],
      status: [],
    });
  };

  const removeFilter = (key: keyof Omit<LeadFiltersState, "search">, value: string) => {
    const updated = filters[key].filter((v) => v !== value);
    onFiltersChange({ ...filters, [key]: updated });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filter Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="font-medium text-sm">Filter Leads</div>

              {/* Pipeline */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Pipeline</Label>
                <div className="grid grid-cols-2 gap-2">
                  {pipelines.map((p) => (
                    <div key={p} className="flex items-center space-x-2">
                      <Checkbox
                        id={`pipeline-${p}`}
                        checked={filters.pipeline.includes(p)}
                        onCheckedChange={() => toggleFilter("pipeline", p)}
                      />
                      <label
                        htmlFor={`pipeline-${p}`}
                        className="text-sm cursor-pointer"
                      >
                        {p}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Source</Label>
                <div className="grid grid-cols-2 gap-2">
                  {sources.map((s) => (
                    <div key={s} className="flex items-center space-x-2">
                      <Checkbox
                        id={`source-${s}`}
                        checked={filters.source.includes(s)}
                        onCheckedChange={() => toggleFilter("source", s)}
                      />
                      <label
                        htmlFor={`source-${s}`}
                        className="text-sm cursor-pointer"
                      >
                        {s}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Type */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Lead Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {leadTypes.map((t) => (
                    <div key={t} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${t}`}
                        checked={filters.leadType.includes(t)}
                        onCheckedChange={() => toggleFilter("leadType", t)}
                      />
                      <label
                        htmlFor={`type-${t}`}
                        className="text-sm cursor-pointer"
                      >
                        {t}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Status</Label>
                <div className="grid grid-cols-2 gap-2">
                  {statuses.map((s) => (
                    <div key={s} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${s}`}
                        checked={filters.status.includes(s)}
                        onCheckedChange={() => toggleFilter("status", s)}
                      />
                      <label
                        htmlFor={`status-${s}`}
                        className="text-sm cursor-pointer"
                      >
                        {s}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="w-full"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active filter badges */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.pipeline.map((p) => (
            <Badge key={`badge-pipeline-${p}`} variant="secondary" className="gap-1">
              Pipeline: {p}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFilter("pipeline", p)}
              />
            </Badge>
          ))}
          {filters.source.map((s) => (
            <Badge key={`badge-source-${s}`} variant="secondary" className="gap-1">
              Source: {s}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFilter("source", s)}
              />
            </Badge>
          ))}
          {filters.leadType.map((t) => (
            <Badge key={`badge-type-${t}`} variant="secondary" className="gap-1">
              Type: {t}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFilter("leadType", t)}
              />
            </Badge>
          ))}
          {filters.status.map((s) => (
            <Badge key={`badge-status-${s}`} variant="secondary" className="gap-1">
              Status: {s}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFilter("status", s)}
              />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-6 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
