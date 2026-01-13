import { useState } from "react";
import { KBHeader } from "./KBHeader";
import { KBSidebar } from "./KBSidebar";
import { KBArticleCard } from "./KBArticleCard";
import { kbCategories, kbArticles, KBArticle } from "@/data/kbMockData";
import { Search, Sparkles } from "lucide-react";

interface KBLandingProps {
  onArticleClick: (article: KBArticle) => void;
  onSearchClick: () => void;
  onNewArticle: () => void;
}

export function KBLanding({ onArticleClick, onSearchClick, onNewArticle }: KBLandingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredArticles = selectedCategory
    ? kbArticles.filter((a) => a.categoryId === selectedCategory)
    : kbArticles;

  const categoryName = selectedCategory
    ? kbCategories.find((c) => c.id === selectedCategory)?.name
    : "All Articles";

  return (
    <div className="min-h-screen bg-background">
      <KBHeader onSearchClick={onSearchClick} onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      
      <div className="flex">
        {/* Sidebar - Hidden on mobile unless menu open */}
        <div className={`hidden lg:block`}>
          <KBSidebar
            categories={kbCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onNewArticle={onNewArticle}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-16 left-0 z-50 lg:hidden">
              <KBSidebar
                categories={kbCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={(id) => {
                  setSelectedCategory(id);
                  setMobileMenuOpen(false);
                }}
                onNewArticle={onNewArticle}
              />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 max-w-6xl">
          {/* Hero Section - Only on "All Articles" */}
          {!selectedCategory && (
            <div className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border border-primary/10">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-semibold">LiteHaus Knowledge Base</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                How can we help you today?
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mb-6">
                Find answers, learn best practices, and get the most out of LiteHaus.
              </p>
              
              {/* Mobile Search */}
              <button
                onClick={onSearchClick}
                className="md:hidden flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl text-sm text-muted-foreground w-full"
              >
                <Search className="h-4 w-4" />
                <span>Search articles...</span>
              </button>
            </div>
          )}

          {/* Category Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{categoryName}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <KBArticleCard
                key={article.id}
                article={article}
                onClick={() => onArticleClick(article)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No articles found</h3>
              <p className="text-muted-foreground text-sm">
                There are no articles in this category yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
