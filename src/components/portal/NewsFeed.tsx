import { TrendingUp, Home, Lightbulb, Calendar } from "lucide-react";

export function NewsFeed() {
  const posts = [
    {
      type: "market",
      icon: TrendingUp,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Austin Market Update: Strong Seller Activity",
      excerpt: "December saw a 12% increase in new listings compared to last year. Buyer demand remains steady with...",
      date: "2 hours ago",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop",
    },
    {
      type: "tip",
      icon: Lightbulb,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Winter Home Maintenance Checklist",
      excerpt: "Protect your home this season with these essential maintenance tasks. From HVAC servicing to...",
      date: "1 day ago",
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=200&fit=crop",
    },
    {
      type: "community",
      icon: Home,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "New Local Business Spotlight: Barton Springs Coffee",
      excerpt: "We're excited to welcome this new neighborhood gem. Stop by for artisan coffee and pastries...",
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=200&fit=crop",
    },
    {
      type: "event",
      icon: Calendar,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "RealtyHaus Annual Client Appreciation Event",
      excerpt: "Join us on January 15th for an evening of food, drinks, and networking at the Four Seasons...",
      date: "3 days ago",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
    },
  ];

  return (
    <div className="surface rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">News & Updates</h2>
        <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <article
            key={index}
            className="group cursor-pointer p-4 rounded-xl hover:bg-slate-50/80 transition-all border border-transparent hover:border-slate-200/60"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-lg ${post.iconBg} flex items-center justify-center`}>
                    <post.icon className={`w-3 h-3 ${post.iconColor}`} />
                  </div>
                  <span className="text-xs text-slate-500">{post.date}</span>
                </div>

                <h3 className="text-sm font-medium text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
