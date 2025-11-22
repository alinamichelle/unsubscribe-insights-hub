import { Gift, Award, TrendingUp } from "lucide-react";

interface RewardsDashboardProps {
  compact?: boolean;
}

export function RewardsDashboard({ compact }: RewardsDashboardProps) {
  if (compact) {
    return (
      <div className="surface rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-900">Rewards</h3>
          <Award className="w-4 h-4 text-slate-400" />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">Your Points</span>
              <span className="text-xs font-medium text-blue-600">Silver Tier</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">1,240</div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>760 to Gold</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: "62%" }} />
            </div>
          </div>

          <button className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
            View Rewards
          </button>
        </div>
      </div>
    );
  }

  const rewards = [
    { name: "RealtyHaus Swag", points: 250, available: true },
    { name: "$50 Restaurant Gift Card", points: 500, available: true },
    { name: "Home Service Credit ($100)", points: 1000, available: true },
    { name: "Weekend Getaway", points: 2500, available: false },
    { name: "Closing Cost Credit", points: 5000, available: false },
  ];

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <div className="surface rounded-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Your Rewards</h2>
            <p className="text-sm text-slate-600">Earn points and unlock exclusive benefits</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Gift className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="text-xs text-slate-500 mb-1">Total Points</div>
            <div className="text-3xl font-semibold text-slate-900">1,240</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Current Tier</div>
            <div className="text-3xl font-semibold text-blue-600">Silver</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">To Next Tier</div>
            <div className="text-3xl font-semibold text-slate-900">760</div>
          </div>
        </div>

        {/* Progress to Gold */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-600">Progress to Gold Tier</span>
            <span className="font-medium text-slate-900">62%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all" style={{ width: "62%" }} />
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="surface rounded-2xl p-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Available Rewards</h3>

        <div className="space-y-4">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl border ${
                reward.available
                  ? "border-slate-200/60 hover:bg-slate-50/80 cursor-pointer"
                  : "border-slate-100 opacity-50"
              } transition-all`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    reward.available ? "bg-gradient-to-br from-purple-100 to-pink-100" : "bg-slate-100"
                  }`}
                >
                  <Gift className={`w-5 h-5 ${reward.available ? "text-purple-600" : "text-slate-400"}`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{reward.name}</div>
                  <div className="text-xs text-slate-500">{reward.points} points</div>
                </div>
              </div>

              {reward.available ? (
                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all">
                  Redeem
                </button>
              ) : (
                <span className="text-xs text-slate-400">Locked</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="surface rounded-2xl p-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Ways to Earn Points</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { action: "Refer a friend", points: 500 },
            { action: "Referral completes purchase", points: 1000 },
            { action: "Leave a review", points: 100 },
            { action: "Attend an event", points: 50 },
            { action: "Complete your profile", points: 25 },
            { action: "Read monthly HausReport", points: 10 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-200/40">
              <span className="text-sm text-slate-700">{item.action}</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">+{item.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
