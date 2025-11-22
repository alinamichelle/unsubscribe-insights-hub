import { Users, Gift, TrendingUp, Share2 } from "lucide-react";

export function ReferralTracker() {
  const referrals = [
    {
      name: "Mike Johnson",
      status: "In Progress",
      stage: "Pre-Approval",
      date: "Dec 10, 2024",
      points: 500,
      potential: 1000,
    },
    {
      name: "Sarah Williams",
      status: "Closed",
      stage: "Transaction Complete",
      date: "Nov 28, 2024",
      points: 1000,
      potential: 1000,
    },
    {
      name: "David Chen",
      status: "Active",
      stage: "House Hunting",
      date: "Dec 15, 2024",
      points: 500,
      potential: 1000,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="surface rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-slate-900">8</div>
          <div className="text-sm text-slate-600">Total Referrals</div>
        </div>

        <div className="surface rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-semibold text-slate-900">3</div>
          <div className="text-sm text-slate-600">Closed Deals</div>
        </div>

        <div className="surface rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Gift className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-semibold text-slate-900">4,500</div>
          <div className="text-sm text-slate-600">Points Earned</div>
        </div>

        <div className="surface rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Share2 className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-semibold text-slate-900">Silver</div>
          <div className="text-sm text-slate-600">Current Tier</div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="surface rounded-2xl p-6">
        <h3 className="text-sm font-medium text-slate-900 mb-4">Your Referral Link</h3>
        <div className="flex gap-3">
          <div className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 font-mono">
            hausportal.com/ref/sarah-chen
          </div>
          <button className="px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Share your link to earn 500 points per referral, plus 1,000 points when they close!
        </p>
      </div>

      {/* Referrals List */}
      <div className="surface rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Your Referrals</h3>
          <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {referrals.map((referral, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200/60 hover:bg-slate-50/80 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                  {referral.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{referral.name}</div>
                  <div className="text-xs text-slate-500">{referral.stage}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-slate-500 mb-1">Status</div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                      referral.status === "Closed"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : referral.status === "Active"
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {referral.status}
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500 mb-1">Points</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {referral.points} <span className="text-slate-500 font-normal">/ {referral.potential}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
