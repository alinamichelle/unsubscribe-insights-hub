import { ReactNode, useState } from "react";
import { Search, Bell, ChevronDown, LayoutDashboard, TrendingDown, Mail, Users, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppShellProps {
  children: ReactNode;
  pageTitle?: string;
  userRole?: "leadership" | "admin" | "agent" | "partner" | "assistant";
}

export function AppShell({ children, pageTitle = "Overview", userRole = "leadership" }: AppShellProps) {
  const [dateRange, setDateRange] = useState("30");

  const getUserInfo = () => {
    switch (userRole) {
      case "leadership":
        return { name: "Sarah Chen", email: "sarah@realtyhaus.com", role: "Team Lead", initials: "SC" };
      case "admin":
        return { name: "Mike Torres", email: "mike@realtyhaus.com", role: "Admin", initials: "MT" };
      case "agent":
        return { name: "Alex Rivera", email: "alex@realtyhaus.com", role: "Agent", initials: "AR" };
      case "partner":
        return { name: "Jordan Lee", email: "jordan@partner.com", role: "Partner", initials: "JL" };
      case "assistant":
        return { name: "Casey Kim", email: "casey@realtyhaus.com", role: "Assistant", initials: "CK" };
      default:
        return { name: "User", email: "user@realtyhaus.com", role: "User", initials: "U" };
    }
  };

  const user = getUserInfo();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Side Navigation */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-slate-200/60 bg-white">
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600"></div>
            <div>
              <div className="text-sm font-semibold text-slate-900">HausSignal</div>
              <div className="text-xs text-slate-500">Realty Haus</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/overview"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
            activeClassName="bg-slate-100 text-slate-900"
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </NavLink>

          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
            activeClassName="bg-slate-100 text-slate-900"
          >
            <TrendingDown className="w-4 h-4" />
            Unsubscribe Intelligence
          </NavLink>

          <NavLink
            to="/campaigns"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
            activeClassName="bg-slate-100 text-slate-900"
          >
            <Mail className="w-4 h-4" />
            Campaigns
          </NavLink>

          <NavLink
            to="/leads"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
            activeClassName="bg-slate-100 text-slate-900"
          >
            <Users className="w-4 h-4" />
            Leads
          </NavLink>

          <NavLink
            to="/portal"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
            activeClassName="bg-slate-100 text-slate-900"
          >
            <Users className="w-4 h-4" />
            HausPortal
          </NavLink>

          {(userRole === "leadership" || userRole === "admin") && (
            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
              activeClassName="bg-slate-100 text-slate-900"
            >
              <Settings className="w-4 h-4" />
              Settings
            </NavLink>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="h-16 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="h-full px-6 flex items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-6">
              <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-36 h-9 rounded-lg border-slate-200 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="ytd">Year to date</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search leads, campaigns..."
                  className="w-64 h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all"
                />
              </div>

              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="w-4 h-4 text-slate-600" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></div>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-3 h-3 text-slate-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="text-sm font-medium text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                        {user.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-rose-600">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
