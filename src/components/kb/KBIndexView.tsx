import { BookOpen, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { kbArticles } from "@/data/kbMockData";

interface KBIndexViewProps {
  onSearchClick?: () => void;
}

export function KBIndexView({ onSearchClick }: KBIndexViewProps) {
  const navigate = useNavigate();
  
  // Show a featured article or the most popular one
  const featuredArticle = kbArticles.reduce((prev, current) => 
    (prev.views > current.views) ? prev : current
  );

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[60vh]">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-2">
          Welcome to the Knowledge Base
        </h1>
        <p className="text-muted-foreground mb-6">
          Select an article from the sidebar or search for a topic to get started.
        </p>

        {/* Search Button */}
        {onSearchClick && (
          <Button
            variant="outline"
            onClick={onSearchClick}
            className="gap-2 rounded-xl mb-8"
          >
            <Search className="h-4 w-4" />
            Search articles...
          </Button>
        )}

        {/* Featured Article Card */}
        <div className="bg-muted/30 border border-border rounded-2xl p-6 text-left">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Most Popular
          </p>
          <h3 className="font-semibold mb-2">{featuredArticle.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {featuredArticle.excerpt}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/app/kb/${featuredArticle.slug}`)}
            className="gap-2 -ml-2 text-primary hover:text-primary"
          >
            Read article
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
