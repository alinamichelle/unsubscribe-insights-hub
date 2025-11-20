import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmailCampaignPerformance } from "@/types/dashboard";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface EmailPerformanceTableProps {
  data: EmailCampaignPerformance[];
  onRowClick: (campaign: EmailCampaignPerformance) => void;
}

type SortField = 'subject' | 'totalSent' | 'totalOpened' | 'totalUnsubs' | 'unsubRate' | 'openRate';
type SortDirection = 'asc' | 'desc';

export const EmailPerformanceTable = ({ data, onRowClick }: EmailPerformanceTableProps) => {
  const [sortField, setSortField] = useState<SortField>('totalUnsubs');
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
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const getUnsubRateColor = (rate: number) => {
    if (rate < 2) return 'text-success';
    if (rate < 4) return 'text-warning';
    return 'text-critical';
  };

  const getEmailTypeBadge = (type: string) => {
    const variants = {
      mass: 'default' as const,
      manual: 'secondary' as const,
      auto: 'outline' as const,
    };
    return variants[type as keyof typeof variants] || 'default';
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('subject')} className="h-8 p-0 hover:bg-transparent">
                  Email Subject / Campaign
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('totalSent')} className="h-8 p-0 hover:bg-transparent">
                  Total Sent
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('totalOpened')} className="h-8 p-0 hover:bg-transparent">
                  Total Opened
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('totalUnsubs')} className="h-8 p-0 hover:bg-transparent">
                  Total Unsubs
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('unsubRate')} className="h-8 p-0 hover:bg-transparent">
                  Unsub Rate
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('openRate')} className="h-8 p-0 hover:bg-transparent">
                  Open Rate
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>First Sent</TableHead>
              <TableHead>Last Sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((campaign, idx) => (
              <TableRow 
                key={idx} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onRowClick(campaign)}
              >
                <TableCell className="font-medium max-w-[300px] truncate">{campaign.subject}</TableCell>
                <TableCell>
                  <Badge variant={getEmailTypeBadge(campaign.emailType)}>
                    {campaign.emailType}
                  </Badge>
                </TableCell>
                <TableCell>{campaign.totalSent.toLocaleString()}</TableCell>
                <TableCell>{campaign.totalOpened.toLocaleString()}</TableCell>
                <TableCell className="font-semibold">{campaign.totalUnsubs}</TableCell>
                <TableCell className={getUnsubRateColor(campaign.unsubRate)}>
                  {campaign.unsubRate.toFixed(1)}%
                </TableCell>
                <TableCell className="text-muted-foreground">{campaign.openRate.toFixed(1)}%</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(campaign.firstSent).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(campaign.lastSent).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} campaigns
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
