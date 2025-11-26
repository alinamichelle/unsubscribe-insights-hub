import { useState } from "react";
import { RefreshCw, SlidersHorizontal, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrioritySignals } from "@/components/today/PrioritySignals";
import { FollowUpQueue } from "@/components/today/FollowUpQueue";
import { TimelineDrawer } from "@/components/today/TimelineDrawer";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  pipelineStage: string;
  signal: "automation-only" | "warming-up" | "high-intent" | "idle-client" | "new-lead";
  lastManual: {
    category: string;
    channel: string;
    daysAgo: number;
  };
  lastAuto: {
    category: string;
    channel: string;
    daysAgo: number;
  };
  daysSinceManual: number;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Martinez",
    email: "sarah.m@example.com",
    phone: "(512) 555-0123",
    pipelineStage: "Active Buyer",
    signal: "automation-only",
    lastManual: { category: "Communication", channel: "Email", daysAgo: 45 },
    lastAuto: { category: "Marketing", channel: "Email", daysAgo: 2 },
    daysSinceManual: 45,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "(512) 555-0456",
    pipelineStage: "Hot Lead",
    signal: "warming-up",
    lastManual: { category: "Communication", channel: "Phone", daysAgo: 3 },
    lastAuto: { category: "Marketing", channel: "Email", daysAgo: 1 },
    daysSinceManual: 3,
  },
  {
    id: "3",
    name: "Jennifer Thompson",
    email: "jen.t@example.com",
    phone: "(512) 555-0789",
    pipelineStage: "Past Client",
    signal: "idle-client",
    lastManual: { category: "Communication", channel: "SMS", daysAgo: 87 },
    lastAuto: { category: "Marketing", channel: "Email", daysAgo: 14 },
    daysSinceManual: 87,
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "d.rodriguez@example.com",
    phone: "(512) 555-0321",
    pipelineStage: "New Lead",
    signal: "new-lead",
    lastManual: { category: "Communication", channel: "Email", daysAgo: 0 },
    lastAuto: { category: "System", channel: "Platform", daysAgo: 0 },
    daysSinceManual: 0,
  },
  {
    id: "5",
    name: "Emily Watson",
    email: "emily.w@example.com",
    phone: "(512) 555-0654",
    pipelineStage: "Under Contract",
    signal: "high-intent",
    lastManual: { category: "Communication", channel: "Phone", daysAgo: 1 },
    lastAuto: { category: "Task", channel: "Platform", daysAgo: 1 },
    daysSinceManual: 1,
  },
];

export default function Today() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Today</h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Your highest-priority follow-ups based on engagement, automation, tasks, and client activity.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        {/* Priority Signals */}
        <PrioritySignals />

        {/* Follow-Up Queue */}
        <FollowUpQueue contacts={mockContacts} onContactClick={setSelectedContact} />
      </div>

      {/* Timeline Drawer */}
      <TimelineDrawer contact={selectedContact} onClose={() => setSelectedContact(null)} />
    </div>
  );
}
