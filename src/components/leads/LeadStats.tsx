import { Users, UserPlus, TrendingUp, Home } from "lucide-react";
import { Lead } from "@/types/dashboard";

interface LeadStatsProps {
  leads: Lead[];
}

export function LeadStats({ leads }: LeadStatsProps) {
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.pipeline === "New").length;
  const buyers = leads.filter((l) => l.lead_type === "Buyer").length;
  const sellers = leads.filter((l) => l.lead_type === "Seller").length;

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads.toLocaleString(),
      icon: Users,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "New Leads",
      value: newLeads.toLocaleString(),
      icon: UserPlus,
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      label: "Buyers",
      value: buyers.toLocaleString(),
      icon: TrendingUp,
      color: "text-amber-600 bg-amber-100",
    },
    {
      label: "Sellers",
      value: sellers.toLocaleString(),
      icon: Home,
      color: "text-purple-600 bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border/60 rounded-xl p-4 flex items-center gap-4"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
