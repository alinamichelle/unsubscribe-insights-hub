import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lead } from "@/types/dashboard";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface LeadTableProps {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
}

type SortField = "full_name" | "email" | "pipeline" | "source" | "lead_type" | "reg_date";
type SortDirection = "asc" | "desc";

const getPipelineColor = (pipeline: string) => {
  switch (pipeline) {
    case "New":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Attempting Contact":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Nurture":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "Past Client":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const getLeadTypeColor = (type: string) => {
  switch (type) {
    case "Buyer":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Seller":
      return "bg-rose-100 text-rose-700 border-rose-200";
    case "Renter":
      return "bg-sky-100 text-sky-700 border-sky-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export function LeadTable({ leads, onRowClick }: LeadTableProps) {
  const [sortField, setSortField] = useState<SortField>("reg_date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  };

  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      switch (sortField) {
        case "full_name":
          aVal = a.full_name.toLowerCase();
          bVal = b.full_name.toLowerCase();
          break;
        case "email":
          aVal = a.email.toLowerCase();
          bVal = b.email.toLowerCase();
          break;
        case "pipeline":
          aVal = a.pipeline;
          bVal = b.pipeline;
          break;
        case "source":
          aVal = a.source;
          bVal = b.source;
          break;
        case "lead_type":
          aVal = a.lead_type;
          bVal = b.lead_type;
          break;
        case "reg_date":
          aVal = new Date(a.reg_date).getTime();
          bVal = new Date(b.reg_date).getTime();
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [leads, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = sortedLeads.slice(startIndex, startIndex + itemsPerPage);

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="h-8 p-0 hover:bg-transparent font-medium"
    >
      {children}
      <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
    </Button>
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border/60 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px]">
                <SortButton field="full_name">Name</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="email">Email</SortButton>
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>
                <SortButton field="pipeline">Pipeline</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="source">Source</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="lead_type">Type</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="reg_date">Registered</SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No leads found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginatedLeads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => onRowClick(lead)}
                >
                  <TableCell className="font-medium">{lead.full_name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPipelineColor(lead.pipeline)}>
                      {lead.pipeline}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getLeadTypeColor(lead.lead_type)}>
                      {lead.lead_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(lead.reg_date), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedLeads.length)} of{" "}
          {sortedLeads.length} leads
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
