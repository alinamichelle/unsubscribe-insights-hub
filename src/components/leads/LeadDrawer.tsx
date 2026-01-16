import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Lead, Agent } from "@/types/dashboard";
import { Mail, Phone, User, Calendar, Tag, MapPin, FileText, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { mockAgents } from "@/data/mockData";

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function LeadDrawer({ lead, open, onOpenChange }: LeadDrawerProps) {
  if (!lead) return null;

  const agent = mockAgents.find((a) => a.id === lead.agent_id);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl">{lead.full_name}</SheetTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className={getPipelineColor(lead.pipeline)}>
              {lead.pipeline}
            </Badge>
            <Badge variant="outline" className={getLeadTypeColor(lead.lead_type)}>
              {lead.lead_type}
            </Badge>
            <Badge variant="outline" className="bg-slate-50">
              {lead.status}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                  {lead.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${lead.phone}`} className="text-foreground hover:underline">
                  {lead.phone}
                </a>
              </div>
            </div>
          </div>

          <Separator />

          {/* Lead Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Lead Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Source</div>
                <div className="font-medium">{lead.source}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Segment</div>
                <div className="font-medium">{lead.segment}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Registered</div>
                <div className="font-medium">
                  {format(new Date(lead.reg_date), "MMM d, yyyy")}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Last Updated</div>
                <div className="font-medium">
                  {format(new Date(lead.updated_at_lofty), "MMM d, yyyy")}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Assigned Agent */}
          {agent && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Assigned Agent</h3>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                    {agent.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs text-muted-foreground">{agent.email}</div>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Tags */}
          {lead.tags.length > 0 && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Notes */}
          {lead.notes && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Notes</h3>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {lead.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex gap-2">
            <Button className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>

          {/* Sync Info */}
          <div className="pt-2 pb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              Last synced: {format(new Date(lead.last_synced_at), "MMM d, yyyy 'at' h:mm a")}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
