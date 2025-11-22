import { Calendar, MapPin, Users, Clock } from "lucide-react";

export function EventCalendar() {
  const events = [
    {
      title: "Annual Client Appreciation Event",
      date: "Jan 15, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Four Seasons Hotel Austin",
      attendees: 124,
      type: "Exclusive",
      status: "registered",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
    },
    {
      title: "Austin Market Outlook Q1 2025",
      date: "Jan 22, 2025",
      time: "12:00 PM - 1:00 PM",
      location: "Virtual (Zoom)",
      attendees: 89,
      type: "Homeowner",
      status: "open",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop",
    },
    {
      title: "Home Staging Workshop",
      date: "Feb 5, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "RealtyHaus Office",
      attendees: 32,
      type: "Educational",
      status: "open",
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=200&fit=crop",
    },
    {
      title: "Spring Market Preview Mixer",
      date: "Feb 18, 2025",
      time: "5:30 PM - 8:00 PM",
      location: "The Line Austin",
      attendees: 67,
      type: "Community",
      status: "open",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    },
  ];

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Exclusive":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Homeowner":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Educational":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Community":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Upcoming Events</h2>
          <p className="text-sm text-slate-600">Join us for exclusive events and educational workshops</p>
        </div>
        <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
          View Calendar
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <div key={index} className="surface rounded-2xl overflow-hidden group cursor-pointer hover:shadow-md transition-all">
            {/* Image */}
            <div className="h-40 overflow-hidden bg-slate-100">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${getTypeBadgeColor(event.type)}`}>
                  {event.type}
                </span>
                {event.status === "registered" && (
                  <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    Registered
                  </span>
                )}
              </div>

              <h3 className="text-base font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              {event.status === "registered" ? (
                <button className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
                  View Details
                </button>
              ) : (
                <button className="w-full px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all">
                  Register
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
