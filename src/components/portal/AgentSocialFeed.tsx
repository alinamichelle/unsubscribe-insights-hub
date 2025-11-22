import { Heart, MessageCircle, Share2, Instagram } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SocialPost {
  id: string;
  type: "instagram" | "blog";
  image?: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  link?: string;
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop",
    content: "Just closed on this beautiful Austin home! Congrats to the Johnson family 🏡✨",
    likes: 234,
    comments: 18,
    timestamp: "2 hours ago",
    link: "https://instagram.com/p/example1"
  },
  {
    id: "2",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop",
    content: "New listing alert! Modern 4BR in Mueller. Open house this Saturday 🔑",
    likes: 189,
    comments: 24,
    timestamp: "5 hours ago",
    link: "https://instagram.com/p/example2"
  },
  {
    id: "3",
    type: "blog",
    content: "Market Update: Austin's housing market showing strong growth in Q4. Read my latest insights on the blog 📊",
    likes: 156,
    comments: 12,
    timestamp: "1 day ago",
    link: "https://blog.example.com/austin-market-q4"
  },
  {
    id: "4",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=400&fit=crop",
    content: "Community event at Zilker Park yesterday! Love connecting with our Austin neighbors 🌳",
    likes: 312,
    comments: 31,
    timestamp: "2 days ago",
    link: "https://instagram.com/p/example3"
  },
  {
    id: "5",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop",
    content: "Throwback to this amazing lakefront property. Still one of my favorite closings! 🌅",
    likes: 278,
    comments: 22,
    timestamp: "3 days ago",
    link: "https://instagram.com/p/example4"
  }
];

export function AgentSocialFeed() {
  return (
    <div className="surface rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-900">Anthony's Updates</h3>
          <p className="text-xs text-slate-500 mt-0.5">Latest from your agent</p>
        </div>
        <Instagram className="w-5 h-5 text-pink-600" />
      </div>

      {/* Scrolling Feed */}
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 overflow-hidden hover:border-slate-300 transition-all hover:shadow-md">
                {/* Post Image */}
                {post.image && (
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="p-4 space-y-3">
                  {/* Agent Info */}
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" 
                      alt="Anthony"
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-900">Anthony Rodriguez</div>
                      <div className="text-[10px] text-slate-500">{post.timestamp}</div>
                    </div>
                    {post.type === "instagram" && (
                      <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
                    )}
                  </div>

                  {/* Caption */}
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Engagement */}
                  <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">{post.comments}</span>
                    </div>
                    <div className="ml-auto">
                      <Share2 className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-200/60">
        <a 
          href="https://instagram.com/anthonyrodriguez" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5"
        >
          <Instagram className="w-3.5 h-3.5" />
          Follow @anthonyrodriguez
        </a>
      </div>
    </div>
  );
}
