import { TrendingUp, Home, MapPin, Calendar } from "lucide-react";

interface HausReportCardProps {
  compact?: boolean;
}

export function HausReportCard({ compact }: HausReportCardProps) {
  if (compact) {
    return (
      <div className="surface rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-900">Latest HausReport</h3>
          <span className="text-xs text-slate-500">Dec 2024</span>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="text-xs text-slate-500 mb-1">Your Home Value</div>
            <div className="text-2xl font-semibold text-slate-900">$845,000</div>
            <div className="text-xs text-emerald-600 mt-1">+$45K this year</div>
          </div>
          
          <button className="w-full px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all">
            View Full Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="surface rounded-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">December 2024</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Your HausReport</h2>
            <p className="text-sm text-slate-600">Monthly snapshot of your home's value and market</p>
          </div>
          
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
            Download PDF
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Your Home */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">Your Home</h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500 mb-1">Current Estimated Value</div>
                <div className="text-3xl font-semibold text-slate-900">$845,000</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Month-over-Month</div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">+1.2%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Year-over-Year</div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">+5.6%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-slate-500 mb-1">Equity Gained Since Purchase</div>
                <div className="text-xl font-semibold text-slate-900">$245,000</div>
                <div className="text-xs text-slate-500 mt-0.5">Purchased Oct 2020 at $600K</div>
              </div>
            </div>
          </div>

          {/* Your Neighborhood */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">Your Neighborhood</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Median Sale Price</div>
                  <div className="text-lg font-semibold text-slate-900">$825K</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Avg Days on Market</div>
                  <div className="text-lg font-semibold text-slate-900">18 days</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Inventory Level</div>
                  <div className="text-lg font-semibold text-slate-900">2.1 mos</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">New Listings</div>
                  <div className="text-lg font-semibold text-slate-900">14</div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-slate-500 mb-1">Closed Sales This Month</div>
                <div className="text-lg font-semibold text-slate-900">23 homes</div>
                <div className="text-xs text-slate-500 mt-0.5">3 homes on your street</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Pulse */}
      <div className="surface rounded-2xl p-8">
        <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide mb-6">Market Pulse</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-slate-500 mb-2">Interest Rate Trend</div>
            <div className="text-lg font-semibold text-slate-900">6.75%</div>
            <div className="text-xs text-amber-600 mt-1">Slight increase from last month</div>
          </div>
          
          <div>
            <div className="text-xs text-slate-500 mb-2">Buyer Demand</div>
            <div className="text-lg font-semibold text-slate-900">Strong</div>
            <div className="text-xs text-emerald-600 mt-1">Above seasonal average</div>
          </div>
          
          <div>
            <div className="text-xs text-slate-500 mb-2">Market Type</div>
            <div className="text-lg font-semibold text-slate-900">Balanced</div>
            <div className="text-xs text-slate-600 mt-1">Fair for buyers and sellers</div>
          </div>
        </div>
      </div>

      {/* Personalized Insights */}
      <div className="surface rounded-2xl p-8">
        <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide mb-6">Personalized Insights</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Strong Appreciation</div>
              <div className="text-sm text-slate-600">Your home has appreciated $45K since purchase - that's 18% equity growth!</div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-200/60">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Hot Neighborhood Activity</div>
              <div className="text-sm text-slate-600">3 homes on your street sold this month - spring market is heating up!</div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Great Time to Consider</div>
              <div className="text-sm text-slate-600">Thinking of upgrading? Your equity position makes this a great time to explore options.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
