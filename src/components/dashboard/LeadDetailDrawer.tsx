import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { UnsubEvent } from "@/types/dashboard";
import { Mail, Phone, User, Calendar, TrendingUp, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeadDetailDrawerProps {
  event: UnsubEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LeadDetailDrawer = ({ event, open, onOpenChange }: LeadDetailDrawerProps) => {
  if (!event) return null;

  const { lead, agent } = event;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Lead Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Lead Overview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{lead.full_name}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Agent: {agent.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span>Pipeline: {lead.pipeline}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Registered: {new Date(lead.reg_date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">{lead.lead_type}</Badge>
              <Badge variant="secondary">{lead.source}</Badge>
              {lead.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Unsubscribe Event */}
          <div className="border-t pt-4 space-y-3">
            <h4 className="font-semibold">Unsubscribe Details</h4>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Unsubscribed from:</p>
              <p className="text-sm">{event.metadata.email_subject}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <span>Date: {new Date(event.occurred_at).toLocaleString()}</span>
                <span>Type: {event.metadata.email_type}</span>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Engagement Before Unsubscribe</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <p className="text-2xl font-bold">{event.emailsSentBefore}</p>
                <p className="text-sm text-muted-foreground">Emails Sent</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <p className="text-2xl font-bold">{event.emailsOpenedBefore}</p>
                <p className="text-sm text-muted-foreground">Emails Opened</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <p className="text-2xl font-bold">{event.daysFromRegToUnsub}</p>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <p className="text-2xl font-bold">
                  {event.emailsOpenedBefore > 0 
                    ? ((event.emailsOpenedBefore / event.emailsSentBefore) * 100).toFixed(0)
                    : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Open Rate</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Recent Activity
            </h4>
            <div className="space-y-3">
              {[
                { type: 'Unsubscribed', date: event.occurred_at, highlight: true },
                { type: 'Email Opened', date: new Date(Date.parse(event.occurred_at) - 86400000).toISOString() },
                { type: 'Email Sent', date: new Date(Date.parse(event.occurred_at) - 172800000).toISOString() },
                { type: 'Email Opened', date: new Date(Date.parse(event.occurred_at) - 432000000).toISOString() },
              ].map((activity, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-3 pb-3 ${i < 3 ? 'border-b' : ''} ${activity.highlight ? 'bg-destructive/5 -mx-2 px-2 py-2 rounded' : ''}`}
                >
                  <div className={`h-2 w-2 rounded-full mt-2 ${activity.highlight ? 'bg-destructive' : 'bg-primary'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
