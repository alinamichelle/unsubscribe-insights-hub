import { useState, useEffect } from "react";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { KBHeader } from "./KBHeader";
import { KBNavPanel } from "./KBNavPanel";
import { KBSearchCommand } from "./KBSearchCommand";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { kbArticles, KBArticle } from "@/data/kbMockData";

export function KBLayout() {
  const location = useLocation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Detect if we're on an editor route (full-width layout)
  const isEditorRoute = location.pathname.includes("/edit") || location.pathname.endsWith("/new");

  // On mobile, if viewing an article, hide nav
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const isViewingArticle = !!slug && !isEditorRoute;

  // Global cmd+k handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleArticleSelect = (article: KBArticle) => {
    navigate(`/app/kb/${article.slug}`);
    setIsSearchOpen(false);
    setIsMobileNavOpen(false);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleNewArticle = () => {
    navigate("/app/kb/new");
    setIsMobileNavOpen(false);
  };

  // Editor route: full-width layout
  if (isEditorRoute) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Outlet context={{ onSearchClick: () => setIsSearchOpen(true) }} />
        <KBSearchCommand
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onArticleSelect={handleArticleSelect}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <KBHeader
        onSearchClick={() => setIsSearchOpen(true)}
        onMenuClick={() => setIsMobileNavOpen(true)}
      />

      <div className="flex-1 flex">
        {/* Desktop: Two-column grid layout */}
        <div className="hidden lg:grid lg:grid-cols-[320px_minmax(0,1fr)] flex-1">
          <KBNavPanel
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            onArticleSelect={handleArticleSelect}
            onNewArticle={handleNewArticle}
            isAdmin={true}
          />
          <main className="overflow-y-auto">
            <Outlet context={{ onSearchClick: () => setIsSearchOpen(true) }} />
          </main>
        </div>

        {/* Mobile: Single column, conditional rendering */}
        <div className="lg:hidden flex-1 flex flex-col">
          {!isViewingArticle ? (
            <KBNavPanel
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              onArticleSelect={handleArticleSelect}
              onNewArticle={handleNewArticle}
              isAdmin={true}
              isMobile={true}
            />
          ) : (
            <main className="flex-1 overflow-y-auto">
              <Outlet context={{ onSearchClick: () => setIsSearchOpen(true) }} />
            </main>
          )}
        </div>
      </div>

      {/* Mobile Nav Sheet (optional hamburger menu) */}
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <KBNavPanel
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            onArticleSelect={handleArticleSelect}
            onNewArticle={handleNewArticle}
            isAdmin={true}
            isMobile={true}
          />
        </SheetContent>
      </Sheet>

      <KBSearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onArticleSelect={handleArticleSelect}
      />
    </div>
  );
}
