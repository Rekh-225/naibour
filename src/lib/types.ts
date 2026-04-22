// ─── Core skill/category types ───────────────────────────────────

export interface ParsedSkill {
  skill: string;
  category: string;
  availability?: string;
}

export interface Offering {
  id: string;
  skill: string;
  category: string;
  description?: string;
  availability?: string;
}

// ─── User Profile (what you offer) ──────────────────────────────

export interface UserProfile {
  id: string;
  userName: string;
  neighborhood: string;
  avatarColor?: string;
  bio?: string;
  offerings: Offering[];
  openToNegotiation: boolean;     // willing to discuss unlisted services
  openToCash: boolean;            // willing to accept cash payments
  trustScore: number;
  verified: boolean;              // KYC verified
  linkedSocials?: string[];       // e.g. ["linkedin", "facebook"]
  createdAt: string;
}

// ─── Need Post (what you need) ──────────────────────────────────

export interface NeedPost {
  id: string;
  profileId: string;              // who posted this
  rawNeed: string;                // free-text description
  parsedNeeds: ParsedSkill[];     // AI-parsed structured needs
  urgency?: "low" | "medium" | "high";
  status: "open" | "matched" | "fulfilled";
  createdAt: string;
}

export type NotificationType = "match_found" | "system";

export interface AppNotification {
  id: string;
  profileId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedNeedId?: string;
  relatedRingId?: string;
  dedupeKey?: string;
}

export interface UserSession {
  token: string;
  profileId: string;
  createdAt: string;
  expiresAt: string;
}

// ─── Legacy compat alias (used by matcher/agent internals) ──────
export interface UserPost {
  id: string;
  userName: string;
  neighborhood: string;
  avatarColor?: string;
  rawNeed: string;
  rawOffer: string;
  parsedNeeds: ParsedSkill[];
  parsedOffers: ParsedSkill[];
  trustScore: number;
  createdAt: string;
}

// ─── 3 trade modes ──────────────────────────────────────────────

export type TradeType = "direct" | "barter" | "multi";

export type TradeStatus =
  | "open"           // listing visible, waiting for takers
  | "proposed"       // offer sent, waiting for response
  | "accepted"       // all parties accepted
  | "declined"       // someone declined
  | "pending_all"    // multi-entity: waiting for all parties
  | "executed";      // completed

/**
 * MODE 1 — Direct 1:1 trade (pre-defined, no negotiation).
 * e.g. "I'll walk your dog if you do my taxes." Both sides known upfront.
 */
export interface DirectTrade {
  id: string;
  type: "direct";
  listingId: string;    // the post being responded to
  fromUserId: string;   // who is fulfilling
  toUserId: string;     // who posted the listing
  offerSkill: string;   // what fromUser provides
  needSkill: string;    // what toUser gets
  status: TradeStatus;
  createdAt: string;
}

/**
 * MODE 2 — Barter offer (1:1 negotiation).
 * Browse someone's listing → propose your own counter-offer → they accept/decline.
 */
export interface BarterOffer {
  id: string;
  type: "barter";
  listingId: string;      // the post being responded to
  fromUserId: string;     // who is proposing
  toUserId: string;       // who posted the listing
  proposedOffer: string;  // free-text: "I'll mow your lawn instead"
  inReturnFor: string;    // what they want from the listing
  message?: string;       // optional note
  status: TradeStatus;
  createdAt: string;
}

/**
 * MODE 3 — Multi-entity trade ring (6 AM heartbeat).
 * AI scans all open listings, finds cycles, proposes to all participants.
 * All must accept for execution.
 */
export interface MultiTrade {
  id: string;
  type: "multi";
  participants: string[];
  edges: GraphEdge[];
  averageConfidence: number;
  score: number;
  status: TradeStatus;
  // Track per-participant acceptance
  acceptedBy: string[];
  declinedBy: string[];
  heartbeatRun: string;   // ISO timestamp of the heartbeat that created this
  createdAt: string;
}

export type Trade = DirectTrade | BarterOffer | MultiTrade;

// ─── Graph & matching ───────────────────────────────────────────

export interface GraphEdge {
  fromUserId: string;
  toUserId: string;
  fromOffer: string;
  toNeed: string;
  confidence: number;
  reasoning: string;
}

export interface MatchResult {
  rings: MultiTrade[];
  totalPostsAnalyzed: number;
  graphEdges: number;
  processingTimeMs: number;
}

export interface AgentStep {
  phase: "perceive" | "reason" | "plan" | "execute" | "adapt";
  description: string;
  timestamp: string;
  data?: unknown;
}

// ─── Heartbeat ──────────────────────────────────────────────────

export interface HeartbeatResult {
  runAt: string;
  nextRun: string;
  ringsFound: number;
  ringsProposed: MultiTrade[];
  steps: AgentStep[];
}

// ─── Gemini parse/score ─────────────────────────────────────────

export interface ParseResponse {
  offers: ParsedSkill[];
  needs: ParsedSkill[];
  confidence: number;
}

export interface CompatibilityScore {
  score: number;
  reasoning: string;
  offerSkill: string;
  needSkill: string;
}
