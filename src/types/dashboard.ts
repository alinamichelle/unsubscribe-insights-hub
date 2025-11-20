export interface Agent {
  id: string;
  name: string;
  email: string;
  lofty_user_id: string;
}

export interface Lead {
  id: string;
  org_id: string;
  lofty_lead_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  tags: string[];
  agent_id: string;
  created_at_lofty: string;
  updated_at_lofty: string;
  last_synced_at: string;
  pipeline: string;
  segment: string;
  reg_date: string;
  lead_type: string;
  notes: string;
}

export interface Event {
  id: string;
  org_id: string;
  source: string;
  lofty_timeline_id: string;
  type_code: number;
  event_type: string;
  occurred_at: string;
  edited_at: string;
  raw_text: string;
  metadata: {
    email_subject?: string;
    email_type?: 'mass' | 'manual' | 'auto';
    campaign_name?: string;
    unsub_reason?: string;
    [key: string]: any;
  };
  lead_id: string;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardFilters {
  dateRange: '7d' | '30d' | '90d' | 'ytd' | 'custom';
  startDate?: string;
  endDate?: string;
  agents: string[];
  leadTypes: string[];
  pipelines: string[];
  sources: string[];
  emailType: 'all' | 'mass' | 'manual';
  emailSubject?: string;
  timeToUnsubBucket?: string;
}

export interface EmailCampaignPerformance {
  subject: string;
  emailType: 'mass' | 'manual' | 'auto';
  totalSent: number;
  totalOpened: number;
  totalUnsubs: number;
  unsubRate: number;
  openRate: number;
  firstSent: string;
  lastSent: string;
  unsubEvents: UnsubEvent[];
  agentBreakdown: { agentId: string; agentName: string; count: number }[];
  pipelineBreakdown: { pipeline: string; count: number }[];
}

export interface UnsubEvent extends Event {
  lead: Lead;
  agent: Agent;
  emailsSentBefore: number;
  emailsOpenedBefore: number;
  daysFromRegToUnsub: number;
}
