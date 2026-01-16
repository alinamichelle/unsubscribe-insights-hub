import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Plus, FileText, Rocket, Users, Zap, Award, HelpCircle, Plug, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { kbArticles, kbCategories, KBArticle } from "@/data/kbMockData";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Users,
  Zap,
  Award,
  HelpCircle,
  Plug,
};

interface KBNavPanelProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onArticleSelect: (article: KBArticle) => void;
  onNewArticle: () => void;
  isAdmin?: boolean;
  isMobile?: boolean;
}

export function KBNavPanel({
  selectedCategory,
  onCategorySelect,
  onArticleSelect,
  onNewArticle,
  isAdmin = false,
  isMobile = false,
}: KBNavPanelProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Get current article slug from URL
  const currentSlug = location.pathname.split("/app/kb/")[1]?.split("/")[0];

  // Filter articles based on category and search
  const filteredArticles = kbArticles.filter((article) => {
    const matchesCategory = !selectedCategory || article.categoryId === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalArticleCount = kbArticles.length;

  return (
    <div className={cn(
      "flex flex-col bg-background border-r border-border",
      isMobile ? "h-full" : "h-[calc(100vh-4rem)]"
    )}>
      {/* New Article Button (Admin Only) */}
      {isAdmin && (
        <div className="p-4 border-b border-border">
          <Button
            onClick={onNewArticle}
            className="w-full gap-2 rounded-xl"
          >
            <Plus className="h-4 w-4" />
            New Article
          </Button>
        </div>
      )}

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter articles..."
            className="pl-9 rounded-xl bg-muted/50 border-none"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Categories Section */}
        <div className="p-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="space-y-1">
            {/* All Articles */}
            <button
              onClick={() => onCategorySelect(null)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors",
                selectedCategory === null
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <span className="flex items-center gap-2.5">
                <FileText className="h-4 w-4" />
                All Articles
              </span>
              <Badge variant="secondary" className="text-xs rounded-full">
                {totalArticleCount}
              </Badge>
            </button>

            {/* Category Buttons */}
            {kbCategories.map((category) => {
              const Icon = iconMap[category.icon] || FileText;
              return (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </span>
                  <Badge variant="secondary" className="text-xs rounded-full">
                    {category.articleCount}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Section */}
        <div className="p-4 pt-0">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Articles
          </h3>
          <div className="space-y-1">
            {filteredArticles.length === 0 ? (
              <p className="text-sm text-muted-foreground px-3 py-2">
                No articles found
              </p>
            ) : (
              filteredArticles.map((article) => {
                const isActive = currentSlug === article.slug;
                return (
                  <button
                    key={article.id}
                    onClick={() => onArticleSelect(article)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <span className="line-clamp-1">{article.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {article.readTime} min read
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Help Footer */}
      <div className="p-4 border-t border-border">
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-sm font-medium mb-1">Need help?</p>
          <p className="text-xs text-muted-foreground mb-3">
            Can't find what you're looking for?
          </p>
          <Button variant="outline" size="sm" className="w-full rounded-lg">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
