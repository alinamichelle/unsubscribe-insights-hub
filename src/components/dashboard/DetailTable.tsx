import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UnsubEvent } from "@/types/dashboard";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface DetailTableProps {
  data: UnsubEvent[];
  onRowClick: (event: UnsubEvent) => void;
}

type SortField = 'full_name' | 'occurred_at' | 'emailsSentBefore' | 'daysFromRegToUnsub';
type SortDirection = 'asc' | 'desc';

export const DetailTable = ({ data, onRowClick }: DetailTableProps) => {
  const [sortField, setSortField] = useState<SortField>('occurred_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal, bVal;
    
    switch (sortField) {
      case 'full_name':
        aVal = a.lead.full_name;
        bVal = b.lead.full_name;
        break;
      case 'occurred_at':
        aVal = new Date(a.occurred_at).getTime();
        bVal = new Date(b.occurred_at).getTime();
        break;
      case 'emailsSentBefore':
        aVal = a.emailsSentBefore;
        bVal = b.emailsSentBefore;
        break;
      case 'daysFromRegToUnsub':
        aVal = a.daysFromRegToUnsub;
        bVal = b.daysFromRegToUnsub;
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('full_name')} className="h-8 p-0 hover:bg-transparent">
                  Lead Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Pipeline</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('occurred_at')} className="h-8 p-0 hover:bg-transparent">
                  Unsubscribed At
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Email Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('emailsSentBefore')} className="h-8 p-0 hover:bg-transparent">
                  Emails Sent
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('daysFromRegToUnsub')} className="h-8 p-0 hover:bg-transparent">
                  Days to Unsub
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((event) => (
              <TableRow 
                key={event.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onRowClick(event)}
              >
                <TableCell className="font-medium">{event.lead.full_name}</TableCell>
                <TableCell>{event.lead.email}</TableCell>
                <TableCell>{event.agent.name}</TableCell>
                <TableCell>{event.lead.source}</TableCell>
                <TableCell>{event.lead.pipeline}</TableCell>
                <TableCell>{new Date(event.occurred_at).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-[200px] truncate">{event.metadata.email_subject}</TableCell>
                <TableCell>
                  <span className="capitalize">{event.metadata.email_type}</span>
                </TableCell>
                <TableCell>{event.emailsSentBefore}</TableCell>
                <TableCell>{event.daysFromRegToUnsub}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
