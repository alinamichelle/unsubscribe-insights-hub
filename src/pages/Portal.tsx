import { useState } from "react";
import { Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PortalHero } from "@/components/portal/PortalHero";
import { HausReportCard } from "@/components/portal/HausReportCard";
import { NewsFeed } from "@/components/portal/NewsFeed";
import { EventCalendar } from "@/components/portal/EventCalendar";
import { ReferralTracker } from "@/components/portal/ReferralTracker";
import { RewardsDashboard } from "@/components/portal/RewardsDashboard";
import { DocumentVault } from "@/components/portal/DocumentVault";
import { AgentDirectory } from "@/components/portal/AgentDirectory";
import { HausKeeping } from "@/components/portal/HausKeeping";
import { ExploreAustin } from "@/components/portal/ExploreAustin";
import { ReferralDrawer } from "@/components/portal/ReferralDrawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type UserTier = "contact" | "homeowner" | "transaction" | "community";

export default function Portal() {
  const [userTier] = useState<UserTier>("homeowner"); // Mock - would come from auth
  const [referralCount] = useState(3); // Mock - would come from backend
  const [raffleTickets] = useState(15); // Mock - calculated from referrals
  const [isReferralDrawerOpen, setIsReferralDrawerOpen] = useState(false);

  return (
    <AppShell pageTitle="HausPortal" userRole="agent">
      <div className="p-6 lg:p-10 space-y-8 max-w-[1360px] mx-auto">
        {/* Floating Refer Button */}
        <Button
          onClick={() => setIsReferralDrawerOpen(true)}
          className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 h-14 px-6 rounded-full shadow-lg hover:shadow-xl transition-all z-30"
          size="lg"
        >
          <Users className="w-5 h-5 mr-2" />
          Refer Someone
        </Button>

        {/* Hero Section */}
        <PortalHero 
          userTier={userTier} 
          referralCount={referralCount}
          raffleTickets={raffleTickets}
        />

        {/* Referral Drawer */}
        <ReferralDrawer
          isOpen={isReferralDrawerOpen}
          onClose={() => setIsReferralDrawerOpen(false)}
        />

        {/* Main Content Tabs */}
        <Tabs defaultValue="home" className="space-y-8">
          <TabsList className="bg-white border border-slate-200/60 rounded-xl p-1.5 shadow-sm">
            <TabsTrigger value="home" className="rounded-lg data-[state=active]:bg-slate-100">
              Home
            </TabsTrigger>
            {userTier === "homeowner" && (
              <TabsTrigger value="hausreport" className="rounded-lg data-[state=active]:bg-slate-100">
                HausReport
              </TabsTrigger>
            )}
            <TabsTrigger value="events" className="rounded-lg data-[state=active]:bg-slate-100">
              Events
            </TabsTrigger>
            <TabsTrigger value="referrals" className="rounded-lg data-[state=active]:bg-slate-100">
              Referrals
            </TabsTrigger>
            <TabsTrigger value="hauskeeping" className="rounded-lg data-[state=active]:bg-slate-100">
              HausKeeping
            </TabsTrigger>
            <TabsTrigger value="explore" className="rounded-lg data-[state=active]:bg-slate-100">
              Explore
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-lg data-[state=active]:bg-slate-100">
              Community
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - News & Updates */}
              <div className="lg:col-span-2 space-y-6">
                <NewsFeed />
              </div>

              {/* Right Column - Quick Access */}
              <div className="space-y-6">
                {userTier === "homeowner" && <HausReportCard compact />}
                <RewardsDashboard compact />
                <AgentDirectory compact />
              </div>
            </div>
          </TabsContent>

          {/* HausReport Tab */}
          {userTier === "homeowner" && (
            <TabsContent value="hausreport" className="space-y-6">
              <HausReportCard />
              <DocumentVault />
            </TabsContent>
          )}

          {/* Events Tab */}
          <TabsContent value="events">
            <EventCalendar />
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals">
            <ReferralTracker />
          </TabsContent>

          {/* HausKeeping Tab */}
          <TabsContent value="hauskeeping">
            <HausKeeping />
          </TabsContent>

          {/* Explore Tab */}
          <TabsContent value="explore">
            <ExploreAustin />
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <div className="surface rounded-2xl p-8 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Join the Community</h3>
                <p className="text-sm text-slate-600">
                  Connect with neighbors, share recommendations, and engage with the RealtyHaus community.
                </p>
                <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all">
                  Opt In to Community
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
