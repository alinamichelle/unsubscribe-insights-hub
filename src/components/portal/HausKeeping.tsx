import { useState } from "react";
import { Search, Phone, Mail, Globe, MapPin, Star, Heart, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Home Services",
  "Home Improvement",
  "Professional Services",
  "Dining & Entertainment",
  "Shopping & Retail",
  "Family & Kids",
  "Wellness & Fitness",
  "Pet Services",
];

const mockBusinesses = [
  {
    id: 1,
    name: "Austin Air & Plumbing",
    category: "Home Services",
    subcategory: "HVAC",
    location: "Central Austin",
    phone: "(512) 555-0100",
    email: "info@austinaircool.com",
    website: "austinaircool.com",
    hours: "Mon-Sat 8am-6pm",
    description: "24/7 emergency service for all your HVAC and plumbing needs.",
    agentNote: "We've used them for 3 years for all our client referrals. Fast, reliable, and fair pricing.",
    memberPerk: "10% off first service for HausPortal members",
    rating: 4.8,
    reviewCount: 24,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Green Leaf Landscaping",
    category: "Home Services",
    subcategory: "Landscaping",
    location: "South Austin",
    phone: "(512) 555-0200",
    email: "hello@greenleafatx.com",
    website: "greenleafatx.com",
    hours: "Mon-Fri 7am-5pm",
    description: "Eco-friendly landscaping and lawn care services.",
    agentNote: "Beautiful work on several of our listings. They transformed a backyard that helped sell a home $20K over asking.",
    memberPerk: "Free consultation + $100 off projects over $1000",
    rating: 4.9,
    reviewCount: 31,
    isFavorite: true,
  },
  {
    id: 3,
    name: "HomeStyle Interiors",
    category: "Home Improvement",
    subcategory: "Interior Designers",
    location: "West Lake Hills",
    phone: "(512) 555-0300",
    email: "design@homestyleatx.com",
    website: "homestyleatx.com",
    hours: "By Appointment",
    description: "Full-service interior design for residential projects.",
    agentNote: "Sarah and her team are incredible. They've staged homes for us and helped clients with post-purchase design.",
    memberPerk: "Free 1-hour design consultation",
    rating: 5.0,
    reviewCount: 18,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Lakeside Pediatrics",
    category: "Family & Kids",
    subcategory: "Pediatricians",
    location: "Lakeway",
    phone: "(512) 555-0400",
    email: "appointments@lakesidepeds.com",
    website: "lakesidepeds.com",
    hours: "Mon-Fri 8am-5pm, Sat 9am-1pm",
    description: "Comprehensive pediatric care for infants through teens.",
    agentNote: "Dr. Martinez is who our team uses for our own kids. Compassionate, thorough, and always available.",
    memberPerk: "Priority scheduling for new patients",
    rating: 4.9,
    reviewCount: 42,
    isFavorite: true,
  },
  {
    id: 5,
    name: "Barton Springs Bistro",
    category: "Dining & Entertainment",
    subcategory: "Restaurants",
    location: "Zilker",
    phone: "(512) 555-0500",
    website: "bartonspringsbistro.com",
    hours: "Tue-Sun 11am-10pm",
    description: "Farm-to-table American cuisine with a Texas twist.",
    agentNote: "Perfect spot for client dinners. Great ambiance, seasonal menu, and the chef sources from local farms.",
    memberPerk: "Complimentary appetizer with entree purchase",
    rating: 4.7,
    reviewCount: 156,
    isFavorite: false,
  },
];

export function HausKeeping() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([2, 4]);

  const filteredBusinesses = mockBusinesses.filter((business) => {
    const matchesCategory = selectedCategory === "All" || business.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">HausKeeping</h2>
        <p className="text-sm text-slate-600">
          Your curated directory of trusted local businesses and service providers
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search businesses, services, or categories..."
            className="pl-10 bg-white border-slate-200/60 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200/60 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-600">
        {filteredBusinesses.length} {filteredBusinesses.length === 1 ? "business" : "businesses"} found
      </div>

      {/* Business Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBusinesses.map((business) => (
          <div
            key={business.id}
            className="bg-white border border-slate-200/60 rounded-2xl p-6 space-y-4 hover:shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">{business.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {business.subcategory}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <MapPin className="h-3 w-3" />
                    {business.location}
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(business.id)}
                className="p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(business.id)
                      ? "fill-rose-500 text-rose-500"
                      : "text-slate-400"
                  }`}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-slate-900">{business.rating}</span>
              </div>
              <span className="text-xs text-slate-500">({business.reviewCount} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600">{business.description}</p>

            {/* Agent Note */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-1">
              <div className="text-[11px] uppercase tracking-wide text-blue-600 font-medium">
                Why We Recommend
              </div>
              <p className="text-sm text-slate-700">{business.agentNote}</p>
            </div>

            {/* Member Perk */}
            {business.memberPerk && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div className="flex-1">
                  <div className="text-[11px] uppercase tracking-wide text-emerald-700 font-medium">
                    Member Perk
                  </div>
                  <p className="text-sm text-slate-700">{business.memberPerk}</p>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Phone className="h-3.5 w-3.5" />
                <span>{business.phone}</span>
              </div>
              {business.email && (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{business.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Globe className="h-3.5 w-3.5" />
                <span>{business.website}</span>
              </div>
              <div className="text-xs text-slate-500">{business.hours}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button variant="default" className="flex-1 rounded-xl">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBusinesses.length === 0 && (
        <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center">
          <div className="max-w-sm mx-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No businesses found</h3>
            <p className="text-sm text-slate-600">
              Try adjusting your search or category filters
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
