import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Clock, FileText, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { kbArticles, kbCategories, KBArticle } from "@/data/kbMockData";

interface KBSearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleSelect: (article: KBArticle) => void;
}

export function KBSearchCommand({ isOpen, onClose, onArticleSelect }: KBSearchCommandProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredArticles = query.length > 0
    ? kbArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const recentSearches = ["import contacts", "automation", "HausSignals"];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredArticles.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filteredArticles[selectedIndex]) {
        onArticleSelect(filteredArticles[selectedIndex]);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, filteredArticles, selectedIndex, onClose, onArticleSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* No Query State */}
          {query.length === 0 && (
            <div className="p-4">
              {/* Recent Searches */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setQuery(search)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-left"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Browse by Category
                </h3>
                <div className="flex flex-wrap gap-2 px-2">
                  {kbCategories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted transition-colors px-3 py-1.5 rounded-lg text-xs"
                      onClick={() => setQuery(cat.name.toLowerCase())}
                    >
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.length > 0 && filteredArticles.length > 0 && (
            <div className="p-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                Results ({filteredArticles.length})
              </h3>
              <div className="space-y-1">
                {filteredArticles.map((article, index) => {
                  const category = kbCategories.find((c) => c.id === article.categoryId);
                  return (
                    <button
                      key={article.id}
                      onClick={() => {
                        onArticleSelect(article);
                        onClose();
                      }}
                      className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl transition-colors text-left ${
                        index === selectedIndex ? "bg-primary/10" : "hover:bg-muted"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-sm truncate">{article.title}</span>
                          {index === selectedIndex && (
                            <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {article.excerpt}
                        </p>
                        <Badge variant="secondary" className="mt-1.5 text-[10px] px-1.5 py-0">
                          {category?.name}
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Results */}
          {query.length > 0 && filteredArticles.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">No results found</h3>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">↵</kbd>
              <span>Open</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">esc</kbd>
            <span>Close</span>
          </span>
        </div>
      </div>
    </div>
  );
}
