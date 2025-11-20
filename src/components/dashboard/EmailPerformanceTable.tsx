import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmailCampaignPerformance } from "@/types/dashboard";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <div className="space-y-6">
      <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm shadow-lg">
        <Table>
          <TableHeader className="bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
            <TableRow className="border-b border-border/50 hover:bg-transparent">
              <TableHead className="font-semibold">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('subject')} 
                  className="h-8 px-2 hover:bg-muted/50 -ml-2"
                >
                  Email Subject / Campaign
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('totalSent')} 
                  className="h-8 px-2 hover:bg-muted/50"
                >
                  Sent
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('totalOpened')} 
                  className="h-8 px-2 hover:bg-muted/50"
                >
                  Opened
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('totalUnsubs')} 
                  className="h-8 px-2 hover:bg-muted/50"
                >
                  Unsubs
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('unsubRate')} 
                  className="h-8 px-2 hover:bg-muted/50"
                >
                  Unsub %
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('openRate')} 
                  className="h-8 px-2 hover:bg-muted/50"
                >
                  Open %
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">First Sent</TableHead>
              <TableHead className="font-semibold">Last Sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((campaign, idx) => (
              <TableRow 
                key={idx} 
                className="group cursor-pointer border-b border-border/30 last:border-0 transition-all duration-200 hover:bg-muted/30"
                onClick={() => onRowClick(campaign)}
              >
                <TableCell className="font-medium max-w-[350px]">
                  <div className="truncate group-hover:text-primary transition-colors">
                    {campaign.subject}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={getEmailTypeBadge(campaign.emailType)}
                    className="font-medium"
                  >
                    {campaign.emailType}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {campaign.totalSent.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {campaign.totalOpened.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold">
                  {campaign.totalUnsubs}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  <span className={cn("font-semibold", getUnsubRateColor(campaign.unsubRate))}>
                    {campaign.unsubRate.toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {campaign.openRate.toFixed(1)}%
                </TableCell>
                <TableCell className="text-sm text-muted-foreground tabular-nums">
                  {new Date(campaign.firstSent).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: '2-digit'
                  })}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground tabular-nums">
                  {new Date(campaign.lastSent).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: '2-digit'
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Premium pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground tabular-nums">
          <span className="font-medium text-foreground">{startIndex + 1}</span>–
          <span className="font-medium text-foreground">{Math.min(startIndex + itemsPerPage, sortedData.length)}</span>
          {' '}of{' '}
          <span className="font-medium text-foreground">{sortedData.length}</span> campaigns
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="hover:bg-muted/50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="hover:bg-muted/50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
