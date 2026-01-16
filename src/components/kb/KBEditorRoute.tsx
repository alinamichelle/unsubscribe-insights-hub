import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Eye,
  Clock,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link2,
  Code,
  Quote,
  AtSign,
  Undo,
  Redo,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { kbCategories, kbArticles } from "@/data/kbMockData";

export function KBEditorRoute() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Determine if editing existing or creating new
  const isNewArticle = !slug;
  const existingArticle = slug ? kbArticles.find((a) => a.slug === slug) : null;

  const [title, setTitle] = useState(existingArticle?.title || "");
  const [content, setContent] = useState(existingArticle?.content || "");
  const [category, setCategory] = useState(existingArticle?.categoryId || "");
  const [isPreview, setIsPreview] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = () => {
    setLastSaved(new Date());
    // In a real app, this would save to the backend
    if (existingArticle) {
      navigate(`/app/kb/${existingArticle.slug}`);
    } else {
      navigate("/app/kb");
    }
  };

  const handleCancel = () => {
    if (existingArticle) {
      navigate(`/app/kb/${existingArticle.slug}`);
    } else {
      navigate("/app/kb");
    }
  };

  const ToolbarButton = ({
    icon: Icon,
    label,
    active,
  }: {
    icon: React.ElementType;
    label: string;
    active?: boolean;
  }) => (
    <button
      className={`p-2 rounded-lg hover:bg-muted transition-colors ${
        active
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-16 px-4 lg:px-6 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Cancel</span>
          </button>

          <Separator orientation="vertical" className="h-6" />

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title..."
            className="border-none shadow-none text-lg font-semibold placeholder:text-muted-foreground/50 focus-visible:ring-0 max-w-md"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {kbCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-lg"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isPreview ? "Edit" : "Preview"}
            </span>
          </Button>

          <Button size="sm" className="gap-2 rounded-lg" onClick={handleSave}>
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-2 flex items-center gap-1 overflow-x-auto">
          <ToolbarButton icon={Undo} label="Undo" />
          <ToolbarButton icon={Redo} label="Redo" />

          <Separator orientation="vertical" className="h-5 mx-2" />

          <ToolbarButton icon={Heading1} label="Heading 1" />
          <ToolbarButton icon={Heading2} label="Heading 2" />

          <Separator orientation="vertical" className="h-5 mx-2" />

          <ToolbarButton icon={Bold} label="Bold" />
          <ToolbarButton icon={Italic} label="Italic" />

          <Separator orientation="vertical" className="h-5 mx-2" />

          <ToolbarButton icon={List} label="Bullet List" />
          <ToolbarButton icon={ListOrdered} label="Numbered List" />

          <Separator orientation="vertical" className="h-5 mx-2" />

          <ToolbarButton icon={Link2} label="Link" />
          <ToolbarButton icon={Code} label="Code" />
          <ToolbarButton icon={Quote} label="Quote" />

          <Separator orientation="vertical" className="h-5 mx-2" />

          <ToolbarButton icon={AtSign} label="Mention" />

          <div className="flex-1" />

          <Button variant="ghost" size="icon" className="rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
          {isPreview ? (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h1>{title || "Untitled Article"}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: content.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your article...

Use # for headings, **bold**, *italic*, and @mention to tag team members.

Tip: Press Cmd+S to save at any time."
              className="w-full min-h-[60vh] bg-transparent border-none outline-none resize-none text-base leading-relaxed placeholder:text-muted-foreground/50"
            />
          )}
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="h-12 px-4 lg:px-6 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span className="text-border">•</span>
          <span>~{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
        </div>

        {lastSaved && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>
              Saved{" "}
              {lastSaved.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}
      </footer>
    </div>
  );
}
