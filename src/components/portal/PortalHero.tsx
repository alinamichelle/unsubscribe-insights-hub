import { Home, TrendingUp, FileText, Users } from "lucide-react";

type UserTier = "contact" | "homeowner" | "transaction" | "community";

interface PortalHeroProps {
  userTier: UserTier;
}

export function PortalHero({ userTier }: PortalHeroProps) {
  const getTierInfo = () => {
    switch (userTier) {
      case "homeowner":
        return {
          title: "Welcome back, Sarah",
          subtitle: "Your home has appreciated $45,000 since purchase",
          badge: "Homeowner Member",
          badgeColor: "from-emerald-500 to-teal-600",
        };
      case "transaction":
        return {
          title: "Your transaction is on track",
          subtitle: "23 days until closing",
          badge: "Active Transaction",
          badgeColor: "from-blue-500 to-indigo-600",
        };
      case "community":
        return {
          title: "Welcome to the community",
          subtitle: "Stay connected with market updates and events",
          badge: "Community Member",
          badgeColor: "from-purple-500 to-pink-600",
        };
      default:
        return {
          title: "Welcome to HausPortal",
          subtitle: "Your connection to RealtyHaus",
          badge: "Contact",
          badgeColor: "from-slate-500 to-slate-600",
        };
    }
  };

  const tierInfo = getTierInfo();

  const quickStats = [
    { icon: Home, label: "Home Value", value: "$845,000", change: "+$45K YoY" },
    { icon: TrendingUp, label: "Equity Position", value: "$245,000", change: "+18% YoY" },
    { icon: FileText, label: "Documents", value: "12", change: "All secured" },
    { icon: Users, label: "Reward Points", value: "1,240", change: "Silver Tier" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="surface rounded-2xl p-8 lg:p-10 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30 pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${tierInfo.badgeColor}`}>
                  {tierInfo.badge}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">
                {tierInfo.title}
              </h1>
              <p className="text-base text-slate-600">{tierInfo.subtitle}</p>
            </div>
            
            {/* Logo */}
            <div className="hidden lg:block">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600" />
            </div>
          </div>

          {/* Quick Stats */}
          {userTier === "homeowner" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {quickStats.map((stat) => (
                <div key={stat.label} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/60">
                  <div className="flex items-start justify-between mb-2">
                    <stat.icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
                  <div className="text-xl font-semibold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-emerald-600 mt-1">{stat.change}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
