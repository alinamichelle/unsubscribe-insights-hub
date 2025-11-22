import { Home, TrendingUp, FileText, Users, Calendar, Ticket } from "lucide-react";
import clientPhoto from "@/assets/client-hausiversary.jpg";

type UserTier = "contact" | "homeowner" | "transaction" | "community";

interface PortalHeroProps {
  userTier: UserTier;
  referralCount?: number;
  raffleTickets?: number;
}

export function PortalHero({ userTier, referralCount = 0, raffleTickets = 0 }: PortalHeroProps) {
  const isEliteMember = referralCount > 0;
  
  const getTierInfo = () => {
    switch (userTier) {
      case "homeowner":
        return {
          title: "Welcome back, Sarah",
          subtitle: "Your home has appreciated $45,000 since purchase",
          badge: isEliteMember ? "Elite Haus Member" : "Haus Member",
          badgeColor: isEliteMember ? "from-amber-500 to-orange-600" : "from-emerald-500 to-teal-600",
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
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex items-start gap-4 flex-1">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img 
                  src={clientPhoto} 
                  alt="Client with Realtor"
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover border-2 border-white shadow-lg"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${tierInfo.badgeColor} shadow-sm`}>
                    {tierInfo.badge}
                  </span>
                  {userTier === "homeowner" && (
                    <>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <Calendar className="h-3 w-3" />
                        Hausiversary: March 15, 2021
                      </div>
                      {raffleTickets > 0 && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          <Ticket className="h-3 w-3" />
                          {raffleTickets} Raffle {raffleTickets === 1 ? 'Ticket' : 'Tickets'}
                        </div>
                      )}
                      {isEliteMember && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Users className="h-3 w-3" />
                          {referralCount} {referralCount === 1 ? 'Referral' : 'Referrals'}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">
                  {tierInfo.title}
                </h1>
                <p className="text-base text-slate-600">{tierInfo.subtitle}</p>
              </div>
            </div>
            
            {/* Logo */}
            <div className="hidden lg:block flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600" />
            </div>
          </div>

          {/* Quick Stats */}
          {userTier === "homeowner" && (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Floating Chat-Style Report Button */}
      {userTier === "homeowner" && (
        <button className="fixed bottom-6 right-6 z-50 group">
          <div className="flex items-center gap-3 bg-white rounded-full shadow-lg border border-slate-200/60 pr-5 pl-2 py-2 hover:shadow-xl transition-all hover:scale-105">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" 
                alt="Your Agent" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-slate-900">View HausReport</div>
              <div className="text-xs text-slate-500">Your latest insights ready</div>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
