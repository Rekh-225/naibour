import { UserProfile, NeedPost, Trade, MultiTrade, AgentStep, UserPost } from "./types";
import { SEED_PROFILES, SEED_NEEDS } from "./seed-data";

class InMemoryStore {
  private profiles: Map<string, UserProfile> = new Map();
  private needs: Map<string, NeedPost> = new Map();
  private trades: Map<string, Trade> = new Map();
  private agentLog: AgentStep[] = [];
  private initialized = false;
  public lastHeartbeat: string | null = null;

  private ensureInit() {
    if (!this.initialized) {
      for (const p of SEED_PROFILES) this.profiles.set(p.id, p);
      for (const n of SEED_NEEDS) this.needs.set(n.id, n);
      this.initialized = true;
    }
  }

  // ─── Profiles ──────────────────────────────────────────────
  addProfile(profile: UserProfile): void {
    this.ensureInit();
    this.profiles.set(profile.id, profile);
  }

  getProfile(id: string): UserProfile | undefined {
    this.ensureInit();
    return this.profiles.get(id);
  }

  getAllProfiles(): UserProfile[] {
    this.ensureInit();
    return Array.from(this.profiles.values());
  }

  updateProfile(id: string, updates: Partial<UserProfile>): void {
    this.ensureInit();
    const existing = this.profiles.get(id);
    if (existing) {
      this.profiles.set(id, { ...existing, ...updates });
    }
  }

  // ─── Need Posts ────────────────────────────────────────────
  addNeed(need: NeedPost): void {
    this.ensureInit();
    this.needs.set(need.id, need);
  }

  getNeed(id: string): NeedPost | undefined {
    this.ensureInit();
    return this.needs.get(id);
  }

  getAllNeeds(): NeedPost[] {
    this.ensureInit();
    return Array.from(this.needs.values());
  }

  getOpenNeeds(): NeedPost[] {
    this.ensureInit();
    return Array.from(this.needs.values()).filter((n) => n.status === "open");
  }

  getNeedsForProfile(profileId: string): NeedPost[] {
    this.ensureInit();
    return Array.from(this.needs.values()).filter((n) => n.profileId === profileId);
  }

  updateNeed(id: string, updates: Partial<NeedPost>): void {
    this.ensureInit();
    const existing = this.needs.get(id);
    if (existing) {
      this.needs.set(id, { ...existing, ...updates });
    }
  }

  // ─── Backward-compat: flatten profiles+needs into UserPosts for matcher ──
  getAllPosts(): UserPost[] {
    this.ensureInit();
    const profiles = this.getAllProfiles();
    const needs = this.getAllNeeds();

    return profiles.map((p) => {
      const userNeeds = needs.filter((n) => n.profileId === p.id && n.status === "open");
      const rawNeed = userNeeds.map((n) => n.rawNeed).join("; ") || "No current needs";
      const rawOffer = p.offerings.map((o) => o.skill).join(", ");
      return {
        id: p.id,
        userName: p.userName,
        neighborhood: p.neighborhood,
        avatarColor: p.avatarColor,
        rawNeed,
        rawOffer,
        parsedNeeds: userNeeds.flatMap((n) => n.parsedNeeds),
        parsedOffers: p.offerings.map((o) => ({
          skill: o.skill,
          category: o.category,
          availability: o.availability,
        })),
        trustScore: p.trustScore,
        createdAt: p.createdAt,
      };
    });
  }

  getPost(id: string): UserPost | undefined {
    return this.getAllPosts().find((p) => p.id === id);
  }

  // ─── Trades (all 3 modes) ─────────────────────────────────
  addTrade(trade: Trade): void {
    this.trades.set(trade.id, trade);
  }

  getTrade(id: string): Trade | undefined {
    return this.trades.get(id);
  }

  getAllTrades(): Trade[] {
    return Array.from(this.trades.values());
  }

  getTradesByType<T extends Trade>(type: T["type"]): T[] {
    return Array.from(this.trades.values()).filter(
      (t) => t.type === type
    ) as T[];
  }

  getTradesForUser(userId: string): Trade[] {
    return Array.from(this.trades.values()).filter((t) => {
      if (t.type === "multi") return t.participants.includes(userId);
      return t.fromUserId === userId || t.toUserId === userId;
    });
  }

  updateTrade(id: string, updates: Partial<Trade>): void {
    const existing = this.trades.get(id);
    if (existing) {
      this.trades.set(id, { ...existing, ...updates } as Trade);
    }
  }

  // ─── Multi-trade specific ─────────────────────────────────
  getAllMultiTrades(): MultiTrade[] {
    return this.getTradesByType<MultiTrade>("multi");
  }

  clearMultiTrades(): void {
    for (const [id, t] of this.trades) {
      if (t.type === "multi") this.trades.delete(id);
    }
  }

  acceptMultiTrade(tradeId: string, userId: string): MultiTrade | null {
    const trade = this.trades.get(tradeId);
    if (!trade || trade.type !== "multi") return null;
    const mt = trade as MultiTrade;
    if (!mt.acceptedBy.includes(userId)) mt.acceptedBy.push(userId);
    if (mt.acceptedBy.length === mt.participants.length) mt.status = "executed";
    this.trades.set(tradeId, mt);
    return mt;
  }

  declineMultiTrade(tradeId: string, userId: string): MultiTrade | null {
    const trade = this.trades.get(tradeId);
    if (!trade || trade.type !== "multi") return null;
    const mt = trade as MultiTrade;
    if (!mt.declinedBy.includes(userId)) mt.declinedBy.push(userId);
    mt.status = "declined";
    this.trades.set(tradeId, mt);
    return mt;
  }

  // ─── Agent Log ─────────────────────────────────────────────
  logAgentStep(step: AgentStep): void {
    this.agentLog.push(step);
  }
  getAgentLog(): AgentStep[] {
    return [...this.agentLog];
  }
  clearAgentLog(): void {
    this.agentLog = [];
  }
}

// Singleton
const globalStore = globalThis as unknown as { __naibourStore?: InMemoryStore };
if (!globalStore.__naibourStore) {
  globalStore.__naibourStore = new InMemoryStore();
}
export const store = globalStore.__naibourStore;
