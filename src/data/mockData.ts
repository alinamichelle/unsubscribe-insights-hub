import { Agent, Lead, UnsubEvent } from "@/types/dashboard";

export const mockAgents: Agent[] = [
  { id: "1", name: "Anthony Rodriguez", email: "anthony@realtyhaus.com", lofty_user_id: "lr_001" },
  { id: "2", name: "Sarah Chen", email: "sarah@realtyhaus.com", lofty_user_id: "lr_002" },
  { id: "3", name: "Michael Torres", email: "michael@realtyhaus.com", lofty_user_id: "lr_003" },
  { id: "4", name: "Jessica Kim", email: "jessica@realtyhaus.com", lofty_user_id: "lr_004" },
  { id: "5", name: "David Martinez", email: "david@realtyhaus.com", lofty_user_id: "lr_005" },
];

export const mockLeads: Lead[] = [
  {
    id: "l1",
    org_id: "realty-haus",
    lofty_lead_id: "ll_001",
    full_name: "Donald Peterson",
    first_name: "Donald",
    last_name: "Peterson",
    email: "donald.p@email.com",
    phone: "(555) 123-4567",
    status: "Active",
    source: "Zillow",
    tags: ["First Time Buyer"],
    agent_id: "1",
    created_at_lofty: "2024-10-15T10:00:00Z",
    updated_at_lofty: "2024-11-18T14:30:00Z",
    last_synced_at: "2024-11-20T08:00:00Z",
    pipeline: "Attempting Contact",
    segment: "Internet Lead",
    reg_date: "2024-10-15T10:00:00Z",
    lead_type: "Buyer",
    notes: "Interested in downtown condos",
  },
  // Add more mock leads as needed
];

export const mockUnsubEvents: UnsubEvent[] = Array.from({ length: 150 }, (_, i) => {
  const agentId = mockAgents[i % mockAgents.length].id;
  const agent = mockAgents.find(a => a.id === agentId)!;
  const sources = ["Zillow", "PPC", "Sphere", "Open House", "Referral"];
  const pipelines = ["New", "Attempting Contact", "Nurture", "Past Client"];
  const leadTypes = ["Buyer", "Seller", "Renter"];
  const emailTypes: Array<'mass' | 'manual' | 'auto'> = ["mass", "manual", "auto"];
  const subjects = [
    "Our Journey Continues: Donald, Meet Realty Haus Group",
    "Market Snapshot: November 2024",
    "Your Dream Home is Waiting",
    "Weekly Property Updates",
    "Exclusive Listing Alert",
    "Neighborhood Market Report",
  ];

  const regDate = new Date(2024, 6 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 28));
  const unsubDate = new Date(regDate.getTime() + Math.random() * 120 * 24 * 60 * 60 * 1000);
  const daysFromReg = Math.floor((unsubDate.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));

  return {
    id: `e${i}`,
    org_id: "realty-haus",
    source: "lofty",
    lofty_timeline_id: `tl_${i}`,
    type_code: 103,
    event_type: "email_unsubscribed",
    occurred_at: unsubDate.toISOString(),
    edited_at: unsubDate.toISOString(),
    raw_text: `Unsubscribed from email`,
    metadata: {
      email_subject: subjects[i % subjects.length],
      email_type: emailTypes[i % emailTypes.length],
      campaign_name: `Campaign ${i % 5}`,
      unsub_reason: "Too many emails",
    },
    lead_id: `l${i}`,
    agent_id: agentId,
    created_at: unsubDate.toISOString(),
    updated_at: unsubDate.toISOString(),
    lead: {
      id: `l${i}`,
      org_id: "realty-haus",
      lofty_lead_id: `ll_${i}`,
      full_name: `Lead ${i} Name`,
      first_name: `Lead${i}`,
      last_name: "Name",
      email: `lead${i}@email.com`,
      phone: `(555) ${String(i).padStart(3, '0')}-${String(i * 2).padStart(4, '0')}`,
      status: "Active",
      source: sources[i % sources.length],
      tags: ["Tag1", "Tag2"],
      agent_id: agentId,
      created_at_lofty: regDate.toISOString(),
      updated_at_lofty: unsubDate.toISOString(),
      last_synced_at: new Date().toISOString(),
      pipeline: pipelines[i % pipelines.length],
      segment: "Internet Lead",
      reg_date: regDate.toISOString(),
      lead_type: leadTypes[i % leadTypes.length],
      notes: "Sample notes",
    },
    agent,
    emailsSentBefore: 5 + Math.floor(Math.random() * 20),
    emailsOpenedBefore: Math.floor(Math.random() * 15),
    daysFromRegToUnsub: daysFromReg,
  };
});
