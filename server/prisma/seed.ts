export type SignalType =
  | 'leadership_change'
  | 'funding_round'
  | 'earnings_event'
  | 'hiring_spike'
  | 'rebranding'
  | 'new_location';

export type SizeBand =
  | '1-10'
  | '11-50'
  | '51-200'
  | '201-500'
  | '501-2000'
  | '2000+';

export interface Signal {
  type: SignalType;
  source: string;
  detected_at: string;
  score: number;
  raw_data: Record<string, unknown>;
}

export interface Company {
  name: string;
  domain: string;
  industry: string;
  vertical: string;
  size: SizeBand;
  location: string;
  revenue_band: string | null;
  contacts: [];
  signals: Signal[];
}

export const seedCompanies: Company[] = [
  // ── Healthcare & MedTech ──────────────────────────────────────────────────
  {
    name: 'Luminos Health',
    domain: 'luminoshealth.com',
    industry: 'Healthcare',
    vertical: 'Healthcare & MedTech',
    size: '201-500',
    location: 'Los Angeles, CA',
    revenue_band: '$50M–$100M',
    contacts: [],
    signals: [
      {
        type: 'leadership_change',
        source: 'LinkedIn',
        detected_at: '2026-03-18T09:00:00Z',
        score: 90,
        raw_data: { role: 'CMO', name: 'Rachel Torres', tenure_start: '2026-03-01' },
      },
    ],
  },
  {
    name: 'MedCore Analytics',
    domain: 'medcoreanalytics.com',
    industry: 'HealthTech',
    vertical: 'Healthcare & MedTech',
    size: '51-200',
    location: 'San Diego, CA',
    revenue_band: '$10M–$50M',
    contacts: [],
    signals: [
      {
        type: 'funding_round',
        source: 'Crunchbase',
        detected_at: '2026-03-10T14:00:00Z',
        score: 85,
        raw_data: { round: 'Series B', amount_usd: 22000000, lead_investor: 'Andreessen Horowitz' },
      },
      {
        type: 'hiring_spike',
        source: 'LinkedIn Jobs',
        detected_at: '2026-03-15T10:00:00Z',
        score: 70,
        raw_data: { open_roles: 14, focus: 'Marketing & Sales', delta_30d: '+140%' },
      },
    ],
  },

  // ── Franchises & Multi-location ───────────────────────────────────────────
  {
    name: 'BrightSmile Dental Group',
    domain: 'brightsmiledentalgroup.com',
    industry: 'Dental Franchise',
    vertical: 'Franchises & Multi-location',
    size: '201-500',
    location: 'Phoenix, AZ',
    revenue_band: '$25M–$50M',
    contacts: [],
    signals: [
      {
        type: 'new_location',
        source: 'Google Maps API',
        detected_at: '2026-03-20T08:00:00Z',
        score: 75,
        raw_data: { new_locations: ['Scottsdale, AZ', 'Tempe, AZ', 'Mesa, AZ'], total_locations: 22 },
      },
    ],
  },
  {
    name: 'FastFuel Express',
    domain: 'fastfuelexpress.com',
    industry: 'Fuel & Convenience Franchise',
    vertical: 'Franchises & Multi-location',
    size: '501-2000',
    location: 'Dallas, TX',
    revenue_band: '$100M–$250M',
    contacts: [],
    signals: [
      {
        type: 'leadership_change',
        source: 'LinkedIn',
        detected_at: '2026-02-28T11:00:00Z',
        score: 88,
        raw_data: { role: 'VP Marketing', name: 'James Okafor', tenure_start: '2026-02-15' },
      },
      {
        type: 'new_location',
        source: 'Press Release',
        detected_at: '2026-03-05T09:00:00Z',
        score: 72,
        raw_data: { new_locations: ['Austin, TX', 'San Antonio, TX'], total_locations: 87 },
      },
    ],
  },

  // ── Investment & Finance ──────────────────────────────────────────────────
  {
    name: 'Vantage Capital Partners',
    domain: 'vantagecapitalpartners.com',
    industry: 'Private Equity',
    vertical: 'Investment & Finance',
    size: '11-50',
    location: 'New York, NY',
    revenue_band: null,
    contacts: [],
    signals: [
      {
        type: 'leadership_change',
        source: 'LinkedIn',
        detected_at: '2026-03-12T10:30:00Z',
        score: 86,
        raw_data: { role: 'CRO', name: 'Sophia Nguyen', tenure_start: '2026-03-01' },
      },
    ],
  },
  {
    name: 'Meridian Wealth Advisors',
    domain: 'meridianwealthadvisors.com',
    industry: 'Financial Advisory',
    vertical: 'Investment & Finance',
    size: '51-200',
    location: 'Chicago, IL',
    revenue_band: '$10M–$25M',
    contacts: [],
    signals: [
      {
        type: 'rebranding',
        source: 'Website Monitor',
        detected_at: '2026-03-01T08:00:00Z',
        score: 68,
        raw_data: { old_name: 'Midwest Wealth Group', new_name: 'Meridian Wealth Advisors', new_site_launched: true },
      },
    ],
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  {
    name: 'Hargrove & Webb LLP',
    domain: 'hargrovewebb.com',
    industry: 'Legal Services',
    vertical: 'Legal',
    size: '51-200',
    location: 'Los Angeles, CA',
    revenue_band: '$10M–$25M',
    contacts: [],
    signals: [
      {
        type: 'hiring_spike',
        source: 'LinkedIn Jobs',
        detected_at: '2026-03-17T09:00:00Z',
        score: 65,
        raw_data: { open_roles: 8, focus: 'Business Development & Marketing', delta_30d: '+120%' },
      },
    ],
  },
  {
    name: 'Apex Legal Group',
    domain: 'apexlegalgroup.com',
    industry: 'Legal Services',
    vertical: 'Legal',
    size: '201-500',
    location: 'Houston, TX',
    revenue_band: '$25M–$50M',
    contacts: [],
    signals: [
      {
        type: 'new_location',
        source: 'Press Release',
        detected_at: '2026-03-08T11:00:00Z',
        score: 70,
        raw_data: { new_locations: ['Austin, TX'], total_locations: 6 },
      },
      {
        type: 'leadership_change',
        source: 'LinkedIn',
        detected_at: '2026-03-10T10:00:00Z',
        score: 84,
        raw_data: { role: 'VP Sales', name: 'Diana Park', tenure_start: '2026-03-01' },
      },
    ],
  },

  // ── IT & SaaS ─────────────────────────────────────────────────────────────
  {
    name: 'Stackify Solutions',
    domain: 'stackifysolutions.com',
    industry: 'B2B SaaS',
    vertical: 'IT & SaaS',
    size: '51-200',
    location: 'Austin, TX',
    revenue_band: '$5M–$10M',
    contacts: [],
    signals: [
      {
        type: 'funding_round',
        source: 'Crunchbase',
        detected_at: '2026-03-14T13:00:00Z',
        score: 88,
        raw_data: { round: 'Series A', amount_usd: 9500000, lead_investor: 'Bessemer Venture Partners' },
      },
      {
        type: 'hiring_spike',
        source: 'LinkedIn Jobs',
        detected_at: '2026-03-19T09:00:00Z',
        score: 72,
        raw_data: { open_roles: 11, focus: 'Sales & Customer Success', delta_30d: '+90%' },
      },
    ],
  },
  {
    name: 'Nocturne IT Services',
    domain: 'nocturneit.com',
    industry: 'Managed IT Services',
    vertical: 'IT & SaaS',
    size: '11-50',
    location: 'Denver, CO',
    revenue_band: '$1M–$5M',
    contacts: [],
    signals: [
      {
        type: 'rebranding',
        source: 'Website Monitor',
        detected_at: '2026-02-25T08:00:00Z',
        score: 60,
        raw_data: { old_name: 'NightOwl Tech', new_name: 'Nocturne IT Services', new_site_launched: true },
      },
    ],
  },

  // ── Staffing & Recruiting ─────────────────────────────────────────────────
  {
    name: 'PeakTalent Group',
    domain: 'peaktalentgroup.com',
    industry: 'Staffing',
    vertical: 'Staffing & Recruiting',
    size: '51-200',
    location: 'Atlanta, GA',
    revenue_band: '$10M–$25M',
    contacts: [],
    signals: [
      {
        type: 'hiring_spike',
        source: 'LinkedIn Jobs',
        detected_at: '2026-03-16T09:00:00Z',
        score: 66,
        raw_data: { open_roles: 18, focus: 'Sales & Account Management', delta_30d: '+150%' },
      },
    ],
  },
  {
    name: 'NexStaff Inc.',
    domain: 'nexstaff.com',
    industry: 'Staffing',
    vertical: 'Staffing & Recruiting',
    size: '201-500',
    location: 'Minneapolis, MN',
    revenue_band: '$25M–$50M',
    contacts: [],
    signals: [
      {
        type: 'leadership_change',
        source: 'LinkedIn',
        detected_at: '2026-03-03T10:00:00Z',
        score: 83,
        raw_data: { role: 'CMO', name: 'Kevin Marsh', tenure_start: '2026-02-15' },
      },
      {
        type: 'new_location',
        source: 'Press Release',
        detected_at: '2026-03-07T08:00:00Z',
        score: 68,
        raw_data: { new_locations: ['Chicago, IL', 'Milwaukee, WI'], total_locations: 9 },
      },
    ],
  },

  // ── Real Estate ───────────────────────────────────────────────────────────
  {
    name: 'Pinnacle Realty Group',
    domain: 'pinnaclerealtygroup.com',
    industry: 'Commercial Real Estate',
    vertical: 'Real Estate',
    size: '51-200',
    location: 'Miami, FL',
    revenue_band: '$10M–$25M',
    contacts: [],
    signals: [
      {
        type: 'earnings_event',
        source: 'SEC EDGAR',
        detected_at: '2026-03-01T12:00:00Z',
        score: 62,
        raw_data: { event: 'Q4 earnings beat', beat_pct: 12, analyst_consensus: 'outperform' },
      },
    ],
  },

  // ── Marketing & Branding ──────────────────────────────────────────────────
  {
    name: 'Ember Creative Agency',
    domain: 'embercreative.com',
    industry: 'Marketing Agency',
    vertical: 'Marketing & Branding',
    size: '11-50',
    location: 'Los Angeles, CA',
    revenue_band: '$1M–$5M',
    contacts: [],
    signals: [
      {
        type: 'rebranding',
        source: 'Website Monitor',
        detected_at: '2026-03-22T08:00:00Z',
        score: 58,
        raw_data: { old_name: 'Ember Studios', new_name: 'Ember Creative Agency', new_site_launched: true },
      },
      {
        type: 'hiring_spike',
        source: 'LinkedIn Jobs',
        detected_at: '2026-03-23T09:00:00Z',
        score: 64,
        raw_data: { open_roles: 6, focus: 'Sales & Business Development', delta_30d: '+100%' },
      },
    ],
  },

  // ── Professional Audio ────────────────────────────────────────────────────
  {
    name: 'SoundStage Pro',
    domain: 'soundstagepro.com',
    industry: 'Professional Audio',
    vertical: 'Professional Audio',
    size: '11-50',
    location: 'Nashville, TN',
    revenue_band: '$1M–$5M',
    contacts: [],
    signals: [
      {
        type: 'new_location',
        source: 'Google Maps API',
        detected_at: '2026-03-11T10:00:00Z',
        score: 60,
        raw_data: { new_locations: ['Los Angeles, CA'], total_locations: 3 },
      },
    ],
  },

  // ── eCommerce ─────────────────────────────────────────────────────────────
  {
    name: 'Terrain Supply Co.',
    domain: 'terrainsupply.com',
    industry: 'eCommerce / Outdoor Retail',
    vertical: 'eCommerce',
    size: '51-200',
    location: 'Portland, OR',
    revenue_band: '$10M–$50M',
    contacts: [],
    signals: [
      {
        type: 'funding_round',
        source: 'Crunchbase',
        detected_at: '2026-03-06T14:00:00Z',
        score: 80,
        raw_data: { round: 'Series A', amount_usd: 7000000, lead_investor: 'Forerunner Ventures' },
      },
      {
        type: 'hiring_spike',
        source: 'LinkedIn Jobs',
        detected_at: '2026-03-09T09:00:00Z',
        score: 69,
        raw_data: { open_roles: 9, focus: 'Marketing & Growth', delta_30d: '+110%' },
      },
    ],
  },

  // ── Non-profits ───────────────────────────────────────────────────────────
  {
    name: 'Second Chance Foundation',
    domain: 'secondchancefoundation.org',
    industry: 'Non-profit',
    vertical: 'Non-profits',
    size: '11-50',
    location: 'Los Angeles, CA',
    revenue_band: null,
    contacts: [],
    signals: [
      {
        type: 'leadership_change',
        source: 'LinkedIn',
        detected_at: '2026-03-13T10:00:00Z',
        score: 74,
        raw_data: { role: 'VP Marketing', name: 'Andrea Flores', tenure_start: '2026-03-01' },
      },
    ],
  },
];
