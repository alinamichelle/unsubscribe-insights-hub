import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand Story */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full max-w-xl">
          <div>
            <div className="flex items-center gap-2 mb-16">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600"></div>
              <span className="text-xl font-semibold">HausSignal</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Turn your email noise<br />into signal.
            </h1>
            
            <p className="text-lg text-slate-300 mb-12 leading-relaxed">
              HausSignal helps your team see real-time engagement, unsubscribes, and pipeline health in one clean dashboard.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              Trusted by Realty Haus agents
            </div>
          </div>

          {/* Mini Preview Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Live Insights</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-semibold">2.1%</div>
                <div className="text-xs text-slate-400 mt-1">Unsub Rate</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">847</div>
                <div className="text-xs text-slate-400 mt-1">Active Leads</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">94%</div>
                <div className="text-xs text-slate-400 mt-1">Open Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600"></div>
            <span className="text-xl font-semibold">HausSignal</span>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(15,23,42,0.08)] p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">Sign in to HausSignal</h2>
              <p className="text-sm text-slate-600">Use your work email to continue.</p>
            </div>

            <form className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-600 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="pl-10 h-11 rounded-xl border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-slate-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 h-11 rounded-xl border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/20"
              >
                Sign in
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button"
                variant="outline"
                className="w-full h-11 rounded-xl border-slate-200 hover:bg-slate-50 font-medium transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="text-center mt-6">
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Forgot password?
                </a>
              </div>
            </form>

            <p className="text-xs text-slate-500 text-center mt-8">
              By signing in, you agree to our{" "}
              <a href="#" className="text-slate-900 hover:underline">terms</a>
              {" "}and{" "}
              <a href="#" className="text-slate-900 hover:underline">privacy policy</a>.
            </p>
          </div>

          <p className="text-sm text-slate-600 text-center mt-6">
            Need access?{" "}
            <a href="#" className="text-slate-900 font-medium hover:underline">
              Contact your admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
