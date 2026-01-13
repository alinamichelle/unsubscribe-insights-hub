export interface KBCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  articleCount: number;
}

export interface KBArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  readTime: number;
}

export interface KBComment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
}

export const kbCategories: KBCategory[] = [
  { id: "1", name: "Getting Started", slug: "getting-started", icon: "Rocket", articleCount: 12 },
  { id: "2", name: "Working with Leads", slug: "leads", icon: "Users", articleCount: 8 },
  { id: "3", name: "Automations", slug: "automations", icon: "Zap", articleCount: 15 },
  { id: "4", name: "Best Practices", slug: "best-practices", icon: "Award", articleCount: 6 },
  { id: "5", name: "Troubleshooting", slug: "troubleshooting", icon: "HelpCircle", articleCount: 9 },
  { id: "6", name: "Integrations", slug: "integrations", icon: "Plug", articleCount: 11 },
];

export const kbArticles: KBArticle[] = [
  {
    id: "1",
    title: "How to Import Your Contact Database",
    slug: "import-contact-database",
    excerpt: "Learn how to seamlessly import your existing contacts from CSV files, other CRMs, or directly from your email provider.",
    content: `
# How to Import Your Contact Database

Getting your contacts into LiteHaus is the first step to unlocking powerful automation and insights. This guide walks you through every import method available.

## Before You Begin

Make sure your contact data is clean and organized. We recommend:

- Removing duplicate entries
- Standardizing phone number formats
- Verifying email addresses are valid

## Import Methods

### 1. CSV Upload

The most common method. Simply export your contacts from your current system as a CSV file.

1. Navigate to **Contacts → Import**
2. Drag and drop your CSV file
3. Map your columns to LiteHaus fields
4. Review and confirm

### 2. Direct CRM Sync

We support direct imports from:

- Salesforce
- HubSpot
- Follow Up Boss
- Chime

### 3. Email Provider Sync

Connect your Gmail or Outlook to automatically import contacts from your email history.

## Field Mapping Tips

| Your Field | Maps To |
|------------|---------|
| First Name | \`first_name\` |
| Last Name | \`last_name\` |
| Email | \`email\` |
| Phone | \`phone\` |
| Source | \`lead_source\` |

## What Happens After Import?

Once imported, LiteHaus automatically:

1. Deduplicates contacts based on email and phone
2. Enriches data with public information
3. Assigns a lead score based on engagement history
4. Triggers your welcome automation (if configured)

> **Pro Tip:** Schedule your imports for off-peak hours (before 8am or after 6pm) for faster processing.

## Need Help?

If you run into any issues, reach out to @Sarah from our support team or check our troubleshooting guide.
    `,
    categoryId: "1",
    author: "LiteHaus Team",
    createdAt: "2025-12-15",
    updatedAt: "2026-01-10",
    views: 1247,
    readTime: 5,
  },
  {
    id: "2",
    title: "Understanding HausSignals and What They Mean",
    slug: "understanding-haussignals",
    excerpt: "HausSignals are real-time behavioral indicators that help you prioritize which leads need attention right now.",
    content: `
# Understanding HausSignals

HausSignals are LiteHaus's proprietary behavioral indicators that surface the leads most likely to convert—right when they're ready.

## What Are HausSignals?

Think of HausSignals as your personal assistant that monitors all lead activity 24/7 and tells you exactly who needs your attention and why.

## Signal Types

### 🔥 Hot Signals

These indicate immediate buying intent:

- **Property Viewed 3+ Times** - Lead has repeatedly viewed a specific listing
- **Price Drop Alert Opened** - They're watching for deals
- **Mortgage Calculator Used** - They're getting serious about financing

### 📈 Warm Signals

These indicate growing interest:

- **Email Opened** - Recent engagement with your content
- **Website Return Visit** - They came back within 7 days
- **Saved Search Created** - Active property hunting

### ⚡ Action Signals

These require immediate response:

- **Form Submitted** - New inquiry waiting
- **Appointment Requested** - Needs confirmation
- **Reply Received** - Conversation active

## Prioritizing Your Day

We recommend checking HausSignals first thing each morning. The dashboard automatically sorts by urgency, so your hottest leads are always at the top.

## Customizing Signals

You can customize which signals matter most to you in **Settings → Signals → Preferences**.
    `,
    categoryId: "1",
    author: "Marcus Chen",
    createdAt: "2025-11-20",
    updatedAt: "2026-01-08",
    views: 2341,
    readTime: 4,
  },
  {
    id: "3",
    title: "Setting Up Your First Automation Sequence",
    slug: "first-automation-sequence",
    excerpt: "Create powerful, hands-off follow-up sequences that nurture leads while you focus on closing deals.",
    content: `
# Setting Up Your First Automation

Automations are the secret weapon of top-producing agents. Let's build your first sequence together.

## The Anatomy of an Automation

Every automation has three parts:

1. **Trigger** - What starts the automation
2. **Actions** - What happens
3. **Conditions** - When to stop or branch

## Building a New Lead Welcome Sequence

This is the most important automation you'll create. Here's our recommended setup:

### Day 0: Immediate Response

- Send personalized welcome email
- Add to "New Lead" segment
- Notify you via push notification

### Day 1: Value Add

- Send local market report
- Include 3 relevant listings

### Day 3: Soft Check-in

- "Did you get a chance to review?"
- Include calendar link for consultation

### Day 7: Social Proof

- Share recent success story
- Client testimonial video

## Pro Tips

> Always include an easy opt-out. Respect beats persistence.

Test your automation by adding yourself as a lead first. See exactly what your prospects experience.
    `,
    categoryId: "3",
    author: "LiteHaus Team",
    createdAt: "2025-10-05",
    updatedAt: "2026-01-05",
    views: 1856,
    readTime: 6,
  },
  {
    id: "4",
    title: "Lead Scoring: How It Works",
    slug: "lead-scoring",
    excerpt: "Understand how LiteHaus calculates lead scores and how to use them to prioritize your outreach.",
    content: "Full article content about lead scoring...",
    categoryId: "2",
    author: "Sarah Mitchell",
    createdAt: "2025-09-15",
    updatedAt: "2025-12-20",
    views: 987,
    readTime: 4,
  },
  {
    id: "5",
    title: "Connecting Your MLS Feed",
    slug: "connecting-mls",
    excerpt: "Step-by-step guide to connecting your local MLS for automatic listing updates and lead matching.",
    content: "Full article content about MLS connection...",
    categoryId: "6",
    author: "Tech Team",
    createdAt: "2025-08-20",
    updatedAt: "2025-11-15",
    views: 2103,
    readTime: 7,
  },
  {
    id: "6",
    title: "Best Practices for Follow-Up Timing",
    slug: "follow-up-timing",
    excerpt: "Research-backed insights on when to reach out for maximum response rates.",
    content: "Full article content about follow-up timing...",
    categoryId: "4",
    author: "LiteHaus Team",
    createdAt: "2025-07-10",
    updatedAt: "2025-10-30",
    views: 1654,
    readTime: 3,
  },
  {
    id: "7",
    title: "Why Emails Aren't Being Delivered",
    slug: "email-delivery-issues",
    excerpt: "Troubleshoot common email delivery problems and improve your inbox placement rates.",
    content: "Full article content about email delivery...",
    categoryId: "5",
    author: "Support Team",
    createdAt: "2025-06-25",
    updatedAt: "2025-12-01",
    views: 876,
    readTime: 5,
  },
  {
    id: "8",
    title: "Zapier Integration Guide",
    slug: "zapier-integration",
    excerpt: "Connect LiteHaus to 5,000+ apps using Zapier for unlimited workflow possibilities.",
    content: "Full article content about Zapier...",
    categoryId: "6",
    author: "Marcus Chen",
    createdAt: "2025-05-15",
    updatedAt: "2025-09-20",
    views: 1432,
    readTime: 8,
  },
];

export const kbComments: KBComment[] = [
  {
    id: "1",
    articleId: "1",
    author: "Jessica Martinez",
    content: "This was super helpful! I was able to import 2,000 contacts in under 10 minutes.",
    createdAt: "2026-01-08",
  },
  {
    id: "2",
    articleId: "1",
    author: "David Thompson",
    content: "Quick question—does the deduplication work if contacts have different email addresses but the same phone number?",
    createdAt: "2026-01-09",
  },
  {
    id: "3",
    articleId: "1",
    author: "Sarah (LiteHaus)",
    content: "@David yes! We match on both email AND phone separately, so duplicates are caught either way.",
    createdAt: "2026-01-09",
  },
  {
    id: "4",
    articleId: "2",
    author: "Mike Rodriguez",
    content: "The HausSignals feature is a game-changer. Closed two deals last week from leads I would have missed.",
    createdAt: "2026-01-05",
  },
];
