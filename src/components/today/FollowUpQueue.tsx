import { Mail, Phone, MessageSquare, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Contact } from "@/pages/Today";

interface FollowUpQueueProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
}

const signalConfig = {
  "automation-only": {
    label: "Automation Only",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  "warming-up": {
    label: "Warming Up",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  "high-intent": {
    label: "High Intent",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  "idle-client": {
    label: "Idle Client",
    color: "bg-slate-100 text-slate-800 border-slate-200",
  },
  "new-lead": {
    label: "New Lead",
    color: "bg-green-100 text-green-800 border-green-200",
  },
};

export function FollowUpQueue({ contacts, onContactClick }: FollowUpQueueProps) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Follow-Up Queue</h2>
        <p className="text-sm text-muted-foreground">
          {contacts.length} contacts need your attention
        </p>
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer border-border/40"
            onClick={() => onContactClick(contact)}
          >
            <div className="flex items-start gap-6">
              {/* Left Column: Contact Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {contact.name}
                    </h3>
                    <Badge variant="outline" className="text-xs font-normal">
                      {contact.pipelineStage}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{contact.email}</span>
                  </div>
                </div>
              </div>

              {/* Middle Column: Signals + Summary */}
              <div className="flex-1 min-w-0">
                <Badge className={`mb-3 ${signalConfig[contact.signal].color}`}>
                  {signalConfig[contact.signal].label}
                </Badge>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>
                    Last manual: {contact.lastManual.category} via {contact.lastManual.channel} (
                    {contact.lastManual.daysAgo}d ago)
                  </div>
                  <div>
                    Last auto: {contact.lastAuto.category} via {contact.lastAuto.channel} (
                    {contact.lastAuto.daysAgo}d ago)
                  </div>
                  <div className="font-medium text-foreground mt-2">
                    {contact.daysSinceManual} days since last manual contact
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Actions */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="h-4 w-4" />
                  Note
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
