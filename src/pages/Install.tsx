import { useState, useEffect } from "react";
import { Download, Check, Smartphone, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/AppShell";

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  return (
    <AppShell pageTitle="Install HausPortal" userRole="agent">
      <div className="min-h-screen p-6 lg:p-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto flex items-center justify-center shadow-lg">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900">
              Install HausPortal
            </h1>
            <p className="text-base text-slate-600">
              Get instant access to your home value, documents, and events - right from your home screen
            </p>
          </div>

          {/* Status Card */}
          {isInstalled ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                App Already Installed!
              </h2>
              <p className="text-sm text-slate-600">
                HausPortal is installed on your device. You can access it from your home screen.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Benefits */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">Why Install?</h2>
                <ul className="space-y-3">
                  {[
                    "Quick access from your home screen",
                    "Push notifications for HausReports and events",
                    "Offline access to documents and past reports",
                    "Faster loading and app-like experience",
                    "No app store required - install instantly",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Install Instructions */}
              {isIOS ? (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Share className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Install on iPhone/iPad
                      </h3>
                      <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
                        <li>Tap the Share button (square with arrow) at the bottom of Safari</li>
                        <li>Scroll down and tap "Add to Home Screen"</li>
                        <li>Tap "Add" in the top right</li>
                        <li>HausPortal will appear on your home screen!</li>
                      </ol>
                    </div>
                  </div>
                </div>
              ) : deferredPrompt ? (
                <Button
                  onClick={handleInstall}
                  size="lg"
                  className="w-full rounded-xl text-base"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Install HausPortal
                </Button>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Install from Browser Menu
                  </h3>
                  <p className="text-sm text-slate-700">
                    Look for "Install App" or "Add to Home Screen" in your browser's menu (usually the three dots or settings icon).
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "📊",
                title: "Home Value",
                description: "Track equity & appreciation",
              },
              {
                icon: "📄",
                title: "Documents",
                description: "Access all your files",
              },
              {
                icon: "🎉",
                title: "Events",
                description: "Join exclusive experiences",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/60 rounded-xl p-4 text-center space-y-2"
              >
                <div className="text-3xl">{feature.icon}</div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {feature.title}
                </h4>
                <p className="text-xs text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
