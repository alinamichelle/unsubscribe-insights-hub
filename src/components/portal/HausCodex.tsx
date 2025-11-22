import { BookOpen, Lightbulb, Clock, Zap, Shield, TrendingUp, Users, FileText } from "lucide-react";

const sections = [
  {
    title: "The Art of Anticipation: What Most People Miss",
    icon: Lightbulb,
    items: [
      {
        number: 1,
        title: "Your Home Has a Memory—Write in It",
        content: [
          "Start a \"living document\" for your home, capturing every improvement, maintenance task, and detail (like paint colors and warranty info).",
          "Why? The better you know your home, the smarter your decisions become—and when the time comes to sell, this journal adds value beyond aesthetics.",
        ],
      },
      {
        number: 2,
        title: "Risk Isn't Just a Financial Term",
        content: [
          "A home is an ecosystem, and small risks compound:",
          "• A tiny leak can lead to structural damage.",
          "• Overgrown trees near power lines? That's an outage waiting to happen.",
          "• Proactive attention minimizes cascading failures (and costs).",
        ],
      },
      {
        number: 3,
        title: "Questions Are Free, Repairs Aren't",
        content: [
          "Adopt a \"What if?\" mindset:",
          "• What if the gutters fail? (Install guards now.)",
          "• What if a pipe bursts? (Locate shut-offs today.)",
          "• What if the AC quits in July? (Schedule maintenance in March.)",
        ],
      },
    ],
  },
  {
    title: "Time is an Asset—Spend It Intentionally",
    icon: Clock,
    items: [
      {
        number: 4,
        title: "The Power of the First 90 Days",
        content: [
          "The first three months in a new home set the tone for the next decade. Focus on these:",
          "• Create a maintenance calendar (e.g., reminders for filter replacements or annual inspections).",
          "• Observe the home: Are there sunny spots in summer that will bake the furniture? Drafts in winter? Adjust now.",
          "• Introduce yourself to neighbors—relationships pay dividends during emergencies.",
        ],
      },
      {
        number: 5,
        title: "Predictable Problems Are Solvable Problems",
        content: [
          "Systems fail in predictable ways. Learn the lifecycle of your biggest investments:",
          "• Roof: 20 years. Inspect it annually after 15.",
          "• HVAC: 15 years. Tune it up every spring.",
          "• Water heaters: 10 years. Drain them yearly to prevent sediment buildup.",
          "• Appliances: 8–12 years. Track age and plan replacements in advance.",
        ],
      },
    ],
  },
  {
    title: "Efficiency Without Compromise",
    icon: Zap,
    items: [
      {
        number: 6,
        title: "The ROI of Small Fixes",
        content: [
          "Most value-adds aren't flashy:",
          "• Seal gaps around doors and windows. It's one of the cheapest ways to reduce energy costs.",
          "• Upgrade to LED bulbs, but choose dimmable warm tones (2700K) for a cozy, efficient vibe.",
          "• Insulate hot water pipes. You'll feel the difference in your wallet.",
        ],
      },
      {
        number: 7,
        title: "Time is Money, But Not All Time is Equal",
        content: [
          "Invest time in learning your home's systems early—before something breaks.",
          "• Label your breaker box now. During a power outage, you'll thank yourself.",
          "• Watch a 10-minute video on shutting off water and gas. Emergencies don't wait.",
        ],
      },
    ],
  },
  {
    title: "Think Like a Steward, Not Just an Owner",
    icon: Shield,
    items: [
      {
        number: 8,
        title: "Ownership is a Verb",
        content: [
          "Your home isn't static; it evolves. Treat it like a living asset:",
          "• Tend to the soil around your foundation in summer (dry soil can cause cracks).",
          "• Rotate furniture and rugs annually to avoid uneven wear on floors and carpets.",
          "• Replace smoke detector batteries when daylight saving time changes.",
        ],
      },
      {
        number: 9,
        title: "The Neighborhood Network",
        content: [
          "Strong communities aren't just nice—they're strategic:",
          "• Exchange contact info with neighbors for emergencies.",
          "• Share tools (ladders, pressure washers) instead of buying them.",
          "• Attend one HOA meeting. You'll learn who makes decisions (and how to influence them).",
        ],
      },
    ],
  },
  {
    title: "Insight Over Instinct: Decisions That Scale",
    icon: TrendingUp,
    items: [
      {
        number: 10,
        title: "Data-Driven Decisions Start Small",
        content: [
          "Smart homeownership isn't just about intuition:",
          "• Use smart thermostats to learn your patterns and reduce energy waste.",
          "• Track utility bills. Spikes can signal leaks or inefficiencies.",
          "• Log every service call and improvement. Over time, patterns emerge that help you optimize.",
        ],
      },
      {
        number: 11,
        title: "The Value of Marginal Gains",
        content: [
          "Focus on incremental improvements over perfection:",
          "• Replacing one window or door seal at a time still adds up.",
          "• Insulating one room annually makes winter more bearable.",
          "• Prioritize based on ROI—what saves you the most over time?",
        ],
      },
    ],
  },
  {
    title: "Mastering the Art of Selling Before You Need To",
    icon: FileText,
    items: [
      {
        number: 12,
        title: "Live Like You're Always Showing",
        content: [
          "A clutter-free home isn't just aesthetically pleasing; it reduces stress and makes transitions easier when selling.",
          "Keep a single box for rotating seasonal decor. More simplicity, less storage stress.",
        ],
      },
      {
        number: 13,
        title: "Document Everything",
        content: [
          "Keep photos of renovations, receipts, and warranties. Buyers pay more for a home with a clear history—and lenders appreciate documentation during appraisals.",
        ],
      },
    ],
  },
  {
    title: "Haus Philosophy: The Why Behind the How",
    icon: Users,
    items: [
      {
        number: 14,
        title: "Proactive Beats Reactive",
        content: [
          "\"The cheapest problem is the one that never happens.\"",
          "• Water your foundation before cracks form.",
          "• Check appliances before their busy seasons (AC in spring, heating in fall).",
          "• Anticipate, don't react.",
        ],
      },
      {
        number: 15,
        title: "Homeownership Isn't a Solo Sport",
        content: [
          "Call on your community. Leverage the expertise of neighbors, the knowledge of local Facebook groups, and the wisdom of professionals.",
          "Ask for help. Even seasoned agents rely on specialists.",
        ],
      },
    ],
  },
];

export function HausCodex() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Haus Codex</h2>
            <p className="text-sm text-slate-600">Uncommon Wisdom for Homeownership</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/60 rounded-2xl p-6">
          <p className="text-sm text-slate-700 leading-relaxed">
            A curated anthology of insights from the collective knowledge of Realty Haus and beyond—refined by years 
            of experience, collaboration, and the kind of advice you won't find in a manual. This is not just a guide; 
            it's a strategy for mastering your space, your investment, and your future.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={sectionIndex} className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all"
                  >
                    <div className="flex gap-4">
                      {/* Number Badge */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{item.number}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                        <div className="space-y-2">
                          {item.content.map((paragraph, paraIndex) => (
                            <p key={paraIndex} className="text-sm text-slate-600 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-8 text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mx-auto flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">A Codex for the Future</h3>
        <p className="text-sm text-slate-700 max-w-2xl mx-auto">
          This isn't just advice—it's a framework for thriving as a homeowner. Every insight here comes from 
          years of collaboration and experience, refined into actionable steps. Use this codex to make your 
          homeownership journey smarter, smoother, and more rewarding.
        </p>
      </div>
    </div>
  );
}
