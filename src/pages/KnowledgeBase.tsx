import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { KBLanding } from "@/components/kb/KBLanding";
import { KBArticleView } from "@/components/kb/KBArticleView";
import { KBSearchCommand } from "@/components/kb/KBSearchCommand";
import { KBEditorPage } from "@/components/kb/KBEditorPage";
import { KBArticle, kbArticles } from "@/data/kbMockData";

type KBView = "landing" | "article" | "editor";

export default function KnowledgeBase() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<KBView>("landing");
  const [selectedArticle, setSelectedArticle] = useState<KBArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewArticle, setIsNewArticle] = useState(false);

  // Handle URL params for deep linking
  useEffect(() => {
    const articleSlug = searchParams.get("article");
    const editorMode = searchParams.get("editor");

    if (editorMode === "new") {
      setView("editor");
      setIsNewArticle(true);
    } else if (articleSlug) {
      const article = kbArticles.find((a) => a.slug === articleSlug);
      if (article) {
        setSelectedArticle(article);
        setView("article");
      }
    } else {
      setView("landing");
      setSelectedArticle(null);
    }
  }, [searchParams]);

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

  const handleArticleClick = (article: KBArticle) => {
    setSelectedArticle(article);
    setSearchParams({ article: article.slug });
    setView("article");
  };

  const handleBack = () => {
    setSearchParams({});
    setView("landing");
    setSelectedArticle(null);
    setIsNewArticle(false);
  };

  const handleNewArticle = () => {
    setSearchParams({ editor: "new" });
    setView("editor");
    setIsNewArticle(true);
  };

  const handleEditArticle = () => {
    if (selectedArticle) {
      setSearchParams({ article: selectedArticle.slug, editor: "true" });
      setView("editor");
      setIsNewArticle(false);
    }
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    handleBack();
  };

  return (
    <>
      {view === "landing" && (
        <KBLanding
          onArticleClick={handleArticleClick}
          onSearchClick={() => setIsSearchOpen(true)}
          onNewArticle={handleNewArticle}
        />
      )}

      {view === "article" && selectedArticle && (
        <KBArticleView
          article={selectedArticle}
          onBack={handleBack}
          onEdit={handleEditArticle}
          onSearchClick={() => setIsSearchOpen(true)}
        />
      )}

      {view === "editor" && (
        <KBEditorPage
          onBack={handleBack}
          onSave={handleSave}
          initialTitle={isNewArticle ? "" : selectedArticle?.title}
          initialContent={isNewArticle ? "" : selectedArticle?.content}
          initialCategory={isNewArticle ? undefined : selectedArticle?.categoryId}
        />
      )}

      <KBSearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onArticleSelect={handleArticleClick}
      />
    </>
  );
}
