import { Rocket, Users, Zap, Award, HelpCircle, Plug, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KBCategory } from "@/data/kbMockData";

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="h-4 w-4" />,
  Users: <Users className="h-4 w-4" />,
  Zap: <Zap className="h-4 w-4" />,
  Award: <Award className="h-4 w-4" />,
  HelpCircle: <HelpCircle className="h-4 w-4" />,
  Plug: <Plug className="h-4 w-4" />,
};

interface KBSidebarProps {
  categories: KBCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  isAdmin?: boolean;
  onNewArticle?: () => void;
}

export function KBSidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  isAdmin = true,
  onNewArticle,
}: KBSidebarProps) {
  return (
    <aside className="w-72 border-r border-border bg-background h-[calc(100vh-4rem)] overflow-y-auto p-4">
      {/* Admin: New Article Button */}
      {isAdmin && (
        <Button
          onClick={onNewArticle}
          className="w-full mb-6 gap-2 rounded-xl h-11 font-semibold"
        >
          <Plus className="h-4 w-4" />
          New Article
        </Button>
      )}

      {/* All Articles */}
      <div className="mb-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
            selectedCategory === null
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="flex-1 text-left">All Articles</span>
          <span className="text-xs text-muted-foreground font-medium">
            {categories.reduce((acc, cat) => acc + cat.articleCount, 0)}
          </span>
        </button>
      </div>

      {/* Categories Label */}
      <div className="px-3 py-2 mt-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </span>
      </div>

      {/* Category List */}
      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              selectedCategory === category.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              selectedCategory === category.id ? "bg-primary/20" : "bg-muted"
            )}>
              {iconMap[category.icon]}
            </div>
            <span className="flex-1 text-left">{category.name}</span>
            <span className="text-xs text-muted-foreground font-medium">
              {category.articleCount}
            </span>
          </button>
        ))}
      </nav>

      {/* Help Section */}
      <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-semibold text-sm mb-1">Need help?</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <Button variant="secondary" size="sm" className="w-full rounded-lg text-xs">
          Contact Support
        </Button>
      </div>
    </aside>
  );
}
