import { Calendar, MapPin, Clock, Users, TrendingUp, Coffee, Music, Utensils, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const neighborhoods = [
  {
    name: "Downtown",
    description: "Urban energy with dining, entertainment, and nightlife",
    highlights: ["6th Street", "Rainey Street", "Red River Cultural District"],
    vibe: "Vibrant & Busy",
  },
  {
    name: "South Congress (SoCo)",
    description: "Eclectic shopping, vintage finds, and iconic food trucks",
    highlights: ["Amy's Ice Cream", "Allen's Boots", "Continental Club"],
    vibe: "Quirky & Cool",
  },
  {
    name: "East Austin",
    description: "Creative hub with breweries, murals, and live music",
    highlights: ["Mueller District", "Franklin BBQ", "Graffiti Park"],
    vibe: "Hip & Artsy",
  },
  {
    name: "Zilker",
    description: "Outdoor paradise with parks, trails, and Barton Springs",
    highlights: ["Zilker Park", "Barton Springs Pool", "Trail of Lights"],
    vibe: "Active & Natural",
  },
];

const happenings = [
  {
    title: "SXSW 2025",
    date: "March 7-16",
    location: "Downtown Austin",
    category: "Festival",
    description: "Film, music, and interactive media festival bringing together creatives worldwide.",
    attendees: "400K+",
    icon: Music,
  },
  {
    title: "Austin Food + Wine Festival",
    date: "April 25-28",
    location: "Auditorium Shores",
    category: "Food & Wine",
    description: "Taste dishes from top chefs and discover Texas wines.",
    attendees: "10K+",
    icon: Utensils,
  },
  {
    title: "Trail of Lights",
    date: "December (Annual)",
    location: "Zilker Park",
    category: "Holiday",
    description: "Austin's beloved holiday tradition with over 2 million lights.",
    attendees: "400K+",
    icon: Calendar,
  },
  {
    title: "Austin City Limits",
    date: "October (Annual)",
    location: "Zilker Park",
    category: "Music",
    description: "Two weekends of world-class music in the heart of Austin.",
    attendees: "450K+",
    icon: Music,
  },
];

const weeklyVibes = [
  {
    day: "Monday",
    vibe: "Coffee & Co-working",
    spots: ["Houndstooth Coffee", "Figure 8 Coffee", "Greater Goods"],
    icon: Coffee,
  },
  {
    day: "Tuesday",
    vibe: "Taco Tuesday Tradition",
    spots: ["Veracruz All Natural", "Torchy's Tacos", "Tacodeli"],
    icon: Utensils,
  },
  {
    day: "Wednesday",
    vibe: "Midweek Live Music",
    spots: ["Continental Club", "Antone's Nightclub", "Saxon Pub"],
    icon: Music,
  },
  {
    day: "Saturday",
    vibe: "Farmers Markets",
    spots: ["SFC Farmers Market", "Texas Farmers Market", "Sunset Valley Market"],
    icon: ShoppingBag,
  },
];

const localInsights = [
  {
    title: "Best Time to Visit Barton Springs",
    tip: "Go on weekday mornings (8-10am) to avoid crowds. Water temp stays 68-70°F year-round.",
  },
  {
    title: "Free Things to Do",
    tip: "Texas Capitol tours, Bullock Museum (free on Sundays), hiking at Barton Creek Greenbelt.",
  },
  {
    title: "Hidden Gems",
    tip: "Cathedral of Junk, Mayfield Park Peacocks, Mount Bonnell sunrise views.",
  },
  {
    title: "Traffic Hacks",
    tip: "Avoid I-35 during rush hour (7-9am, 4-7pm). Use Mopac or take side streets like Lamar or Burnet.",
  },
];

export function ExploreAustin() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">Explore Austin</h2>
        <p className="text-sm text-slate-600">
          Your insider guide to the best of Austin - events, neighborhoods, and local favorites
        </p>
      </div>

      {/* Major Happenings */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Major Events & Festivals</h3>
          <Badge variant="secondary" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Don't Miss
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {happenings.map((event, index) => {
            const Icon = event.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/60 rounded-2xl p-6 space-y-4 hover:shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-slate-900">{event.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{event.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {event.category}
                </Badge>
              </div>
            );
          })}
        </div>
      </section>

      {/* Neighborhood Guide */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Neighborhood Guide</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {neighborhoods.map((hood, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/60 rounded-2xl p-6 space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-lg font-semibold text-slate-900">{hood.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {hood.vibe}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{hood.description}</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wide text-slate-500 font-medium">
                  Must-Visit
                </div>
                <div className="flex flex-wrap gap-2">
                  {hood.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-lg text-xs text-slate-700"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Vibes */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Weekly Austin Vibes</h3>
        <div className="bg-white border border-slate-200/60 rounded-2xl divide-y divide-slate-100">
          {weeklyVibes.map((day, index) => {
            const Icon = day.icon;
            return (
              <div key={index} className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-slate-600" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-slate-900">{day.day}</span>
                    <span className="text-sm text-slate-600">{day.vibe}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {day.spots.map((spot, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {spot}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Local Insights */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Local Insider Tips</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {localInsights.map((insight, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-6 space-y-2"
            >
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">💡</span>
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-semibold text-slate-900">{insight.title}</h4>
                  <p className="text-sm text-slate-700">{insight.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <div className="bg-white border border-slate-200/60 rounded-2xl p-8 text-center">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 mx-auto flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">More Coming Soon</h3>
          <p className="text-sm text-slate-600">
            We're adding interactive maps, real-time event updates, and personalized recommendations based on your interests.
          </p>
        </div>
      </div>
    </div>
  );
}
