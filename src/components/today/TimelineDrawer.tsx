import { X, Mail, Phone, MessageSquare, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Contact } from "@/pages/Today";

interface TimelineDrawerProps {
  contact: Contact | null;
  onClose: () => void;
}

const mockActivities = [
  {
    id: "1",
    category: "Marketing",
    channel: "Email",
    auto: true,
    direction: "outbound",
    description: "Monthly market update sent",
    timestamp: "2 days ago",
  },
  {
    id: "2",
    category: "Communication",
    channel: "Phone",
    auto: false,
    direction: "outbound",
    description: "Follow-up call regarding property search",
    timestamp: "3 days ago",
  },
  {
    id: "3",
    category: "Marketing",
    channel: "Email",
    auto: true,
    direction: "outbound",
    description: "New listings in their area",
    timestamp: "1 week ago",
  },
  {
    id: "4",
    category: "Communication",
    channel: "Email",
    auto: false,
    direction: "inbound",
    description: "Client replied about viewing schedule",
    timestamp: "2 weeks ago",
  },
];

const recommendedActions = [
  {
    icon: Phone,
    title: "Call Now",
    description: "It's been 45 days since your last personal contact",
    priority: "high",
  },
  {
    icon: Mail,
    title: "Send Email",
    description: "Share new listings matching their criteria",
    priority: "medium",
  },
  {
    icon: MessageSquare,
    title: "Add Note",
    description: "Document any recent conversations or insights",
    priority: "low",
  },
];

export function TimelineDrawer({ contact, onClose }: TimelineDrawerProps) {
  if (!contact) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-background border-l border-border/40 shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="border-b border-border/40 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">{contact.name}</h2>
              <Badge variant="outline" className="text-xs">
                {contact.pipelineStage}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
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

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Signal Explanation */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Why This Matters Today</h3>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                This contact has been receiving only automated communication for the past{" "}
                {contact.daysSinceManual} days. Manual outreach is recommended to maintain the
                relationship and prevent them from becoming disengaged.
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Next Actions</h3>
              <div className="space-y-2">
                {recommendedActions.map((action, index) => {
                  const Icon = action.icon;
                  const priorityColor =
                    action.priority === "high"
                      ? "border-red-200 bg-red-50"
                      : action.priority === "medium"
                      ? "border-orange-200 bg-orange-50"
                      : "border-slate-200 bg-slate-50";

                  return (
                    <button
                      key={index}
                      className={`w-full text-left p-3 rounded-lg border ${priorityColor} hover:shadow-sm transition-all duration-200`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-4 w-4 text-foreground mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground mb-1">
                            {action.title}
                          </div>
                          <div className="text-xs text-muted-foreground">{action.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Last Activities */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {activity.channel === "Email" && <Mail className="h-3.5 w-3.5" />}
                        {activity.channel === "Phone" && <Phone className="h-3.5 w-3.5" />}
                        {activity.channel === "Platform" && <Calendar className="h-3.5 w-3.5" />}
                      </div>
                      <div className="w-px h-full bg-border/40 mt-2" />
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            activity.auto
                              ? "bg-slate-50 text-slate-700 border-slate-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {activity.auto ? "Auto" : "Manual"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {activity.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="border-t border-border/40 p-4">
          <Button className="w-full" size="lg">
            View Full Timeline
          </Button>
        </div>
      </div>
    </>
  );
}
