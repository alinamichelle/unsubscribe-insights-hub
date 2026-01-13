import { Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KBArticle, kbCategories } from "@/data/kbMockData";

interface KBArticleCardProps {
  article: KBArticle;
  onClick: () => void;
}

export function KBArticleCard({ article, onClick }: KBArticleCardProps) {
  const category = kbCategories.find((c) => c.id === article.categoryId);

  return (
    <article
      onClick={onClick}
      className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
    >
      {/* Category Badge */}
      <Badge
        variant="secondary"
        className="mb-3 text-[11px] font-semibold px-2 py-0.5 rounded-md"
      >
        {category?.name || "General"}
      </Badge>

      {/* Title */}
      <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {article.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium">{article.author}</span>
        <span className="text-border">•</span>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{article.readTime} min read</span>
        </div>
        <span className="text-border">•</span>
        <div className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          <span>{article.views.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}
