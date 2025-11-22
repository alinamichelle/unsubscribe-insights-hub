import { Mail, Phone, MessageCircle } from "lucide-react";

interface AgentDirectoryProps {
  compact?: boolean;
}

export function AgentDirectory({ compact }: AgentDirectoryProps) {
  const agents = [
    {
      name: "Sarah Chen",
      role: "Your Agent",
      email: "sarah@realtyhaus.com",
      phone: "(512) 555-0123",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Michael Torres",
      role: "Team Lead",
      email: "michael@realtyhaus.com",
      phone: "(512) 555-0124",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ];

  if (compact) {
    return (
      <div className="surface rounded-2xl p-6">
        <h3 className="text-sm font-medium text-slate-900 mb-4">Your Team</h3>

        <div className="space-y-3">
          {agents.slice(0, 1).map((agent, index) => (
            <div key={index} className="flex items-center gap-3">
              <img src={agent.image} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 truncate">{agent.name}</div>
                <div className="text-xs text-slate-500">{agent.role}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Message
        </button>
      </div>
    );
  }

  return (
    <div className="surface rounded-2xl p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Your RealtyHaus Team</h3>

      <div className="space-y-6">
        {agents.map((agent, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/60 hover:bg-slate-50/80 transition-all">
            <img src={agent.image} alt={agent.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />

            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900 mb-1">{agent.name}</div>
              <div className="text-xs text-slate-500 mb-3">{agent.role}</div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-all">
                  <MessageCircle className="w-3 h-3" />
                  Message
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-all">
                  <Phone className="w-3 h-3" />
                  Call
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-all">
                  <Mail className="w-3 h-3" />
                  Email
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
