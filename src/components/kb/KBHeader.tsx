import { Search, Command, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface KBHeaderProps {
  onSearchClick: () => void;
  onMenuClick: () => void;
}

export function KBHeader({ onSearchClick, onMenuClick }: KBHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  return (
    <header className="h-16 px-6 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between">
      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight">LiteHaus</span>
            <span className="text-[10px] text-muted-foreground font-medium -mt-0.5">Knowledge Base</span>
          </div>
        </div>
      </div>

      {/* Center: Search Bar */}
      <button
        onClick={onSearchClick}
        className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-muted/50 hover:bg-muted border border-border rounded-xl text-sm text-muted-foreground transition-all hover:border-primary/20 hover:shadow-sm w-80"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search articles...</span>
        <div className="flex items-center gap-1 text-xs bg-background px-1.5 py-0.5 rounded-md border border-border">
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      </button>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Avatar className="h-9 w-9 border-2 border-border">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
