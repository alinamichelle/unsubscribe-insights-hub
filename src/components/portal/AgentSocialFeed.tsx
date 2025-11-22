import { Heart, MessageCircle, Instagram } from "lucide-react";

interface SocialPost {
  id: string;
  type: "instagram" | "blog";
  image: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop",
    likes: 234,
    comments: 18,
    timestamp: "2h"
  },
  {
    id: "2",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop",
    likes: 189,
    comments: 24,
    timestamp: "5h"
  },
  {
    id: "3",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=400&fit=crop",
    likes: 312,
    comments: 31,
    timestamp: "2d"
  },
  {
    id: "4",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop",
    likes: 278,
    comments: 22,
    timestamp: "3d"
  },
  {
    id: "5",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop",
    likes: 195,
    comments: 15,
    timestamp: "4d"
  },
  {
    id: "6",
    type: "instagram",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop",
    likes: 423,
    comments: 38,
    timestamp: "5d"
  }
];

export function AgentSocialFeed() {
  return (
    <div className="surface rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-900">Anthony's Updates</h3>
          <p className="text-xs text-slate-500 mt-0.5">Latest posts</p>
        </div>
        <a 
          href="https://instagram.com/anthonyrodriguez" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-1"
        >
          <Instagram className="w-4 h-4" />
          Follow
        </a>
      </div>

      {/* Horizontal Scrolling Grid */}
      <div className="overflow-x-auto -mx-6 px-6 scrollbar-hide">
        <div className="flex gap-3 pb-2">
          {mockPosts.map((post) => (
            <a
              key={post.id}
              href={`https://instagram.com/p/${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[160px] group"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 overflow-hidden hover:border-slate-300 transition-all hover:shadow-md">
                {/* Post Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Engagement Stats */}
                <div className="p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="font-medium">{post.comments}</span>
                    </div>
                    <span className="text-slate-400">{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
