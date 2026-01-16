import { useParams, useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft, Clock, Eye, Edit, History, MoreHorizontal, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { kbArticles, kbCategories, kbComments } from "@/data/kbMockData";

interface OutletContextType {
  onSearchClick: () => void;
}

export function KBArticleViewRoute() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const context = useOutletContext<OutletContextType>();

  const article = kbArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Article not found</h2>
          <p className="text-muted-foreground mb-4">
            The article you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/app/kb")}>
            Back to Knowledge Base
          </Button>
        </div>
      </div>
    );
  }

  const category = kbCategories.find((c) => c.id === article.categoryId);
  const articleComments = kbComments.filter((c) => c.articleId === article.id);

  return (
    <div className="flex-1 flex flex-col">
      {/* Sticky Article Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/app/kb")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to articles</span>
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-lg"
              asChild
            >
              <Link to="edit">
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 rounded-lg">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-lg">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-10 w-full">
        {/* Header */}
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4 text-xs font-semibold">
            {category?.name}
          </Badge>

          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                  {article.author.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{article.author}</span>
            </div>
            <span className="text-border">•</span>
            <span>
              Updated{" "}
              {new Date(article.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{article.readTime} min read</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{article.views.toLocaleString()} views</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />
        </div>

        {/* Feedback */}
        <div className="mt-12 p-6 rounded-2xl border border-border bg-muted/30">
          <p className="text-sm font-medium mb-3">Was this article helpful?</p>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 rounded-lg">
              <ThumbsUp className="h-4 w-4" />
              Yes, thanks!
            </Button>
            <Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground">
              Not really
            </Button>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Comments Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments ({articleComments.length})
            </h2>
          </div>

          {/* Add Comment */}
          <div className="mb-6 p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  placeholder="Add a comment... Use @mention to tag someone"
                  className="w-full min-h-[80px] resize-none text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" className="rounded-lg">
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-4">
            {articleComments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl border border-border bg-card/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {comment.author.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold">{comment.author}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

function formatContent(content: string): string {
  return content
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-5 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$2</li>')
    .replace(
      /^> (.*$)/gm,
      '<blockquote class="border-l-4 border-primary/30 pl-4 py-1 my-4 text-muted-foreground italic">$1</blockquote>'
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">$1</code>'
    )
    .replace(
      /@(\w+)/g,
      '<span class="px-1.5 py-0.5 bg-primary/10 text-primary rounded-full text-sm font-medium">@$1</span>'
    )
    .replace(/\n\n/g, '</p><p class="my-4">')
    .replace(/^\|(.+)\|$/gm, (match, content) => {
      const cells = content
        .split("|")
        .map(
          (c: string) =>
            `<td class="border border-border px-3 py-2">${c.trim()}</td>`
        )
        .join("");
      return `<tr>${cells}</tr>`;
    });
}
