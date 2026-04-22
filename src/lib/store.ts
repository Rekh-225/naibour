import fs from "node:fs";
import path from "node:path";
import { UserProfile, NeedPost, Trade, MultiTrade, AgentStep, UserPost, AppNotification, UserSession } from "./types";
import { SEED_PROFILES, SEED_NEEDS } from "./seed-data";

const MAX_AGENT_LOG_STEPS = 1000;
const DATA_DIR = path.join(process.cwd(), ".naibour-data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

type PersistedStore = {
  profiles: UserProfile[];
  needs: NeedPost[];
  trades: Trade[];
  notifications: AppNotification[];
  sessions: UserSession[];
  agentLog: AgentStep[];
  lastHeartbeat: string | null;
};

class InMemoryStore {
  private profiles: Map<string, UserProfile> = new Map();
  private needs: Map<string, NeedPost> = new Map();
  private trades: Map<string, Trade> = new Map();
  private notifications: Map<string, AppNotification> = new Map();
  private sessions: Map<string, UserSession> = new Map();
  private agentLog: AgentStep[] = [];
  private initialized = false;
  public lastHeartbeat: string | null = null;

  private persist() {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      const payload: PersistedStore = {
        profiles: Array.from(this.profiles.values()),
        needs: Array.from(this.needs.values()),
        trades: Array.from(this.trades.values()),
        notifications: Array.from(this.notifications.values()),
        sessions: Array.from(this.sessions.values()),
        agentLog: this.agentLog,
        lastHeartbeat: this.lastHeartbeat,
      };
      fs.writeFileSync(STORE_FILE, JSON.stringify(payload, null, 2), "utf-8");
    } catch (error) {
      console.error("[Store] Failed to persist data:", error);
    }
  }

  private loadPersistedData(): boolean {
    try {
      if (!fs.existsSync(STORE_FILE)) return false;

      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(raw) as PersistedStore;

      for (const p of parsed.profiles || []) this.profiles.set(p.id, p);
      for (const n of parsed.needs || []) this.needs.set(n.id, n);
      for (const t of parsed.trades || []) this.trades.set(t.id, t);
      for (const ntf of parsed.notifications || []) this.notifications.set(ntf.id, ntf);
      for (const s of parsed.sessions || []) this.sessions.set(s.token, s);

      this.agentLog = (parsed.agentLog || []).slice(-MAX_AGENT_LOG_STEPS);
      this.lastHeartbeat = parsed.lastHeartbeat || null;

      return true;
    } catch (error) {
      console.error("[Store] Failed to load persisted data, using seed data:", error);
      return false;
    }
  }

  private pruneExpiredSessions() {
    const now = Date.now();
    let changed = false;

    for (const [token, session] of this.sessions) {
      if (new Date(session.expiresAt).getTime() <= now) {
        this.sessions.delete(token);
        changed = true;
      }
    }

    if (changed) this.persist();
  }

  private ensureInit() {
    if (!this.initialized) {
      const loaded = this.loadPersistedData();
      if (!loaded) {
        for (const p of SEED_PROFILES) this.profiles.set(p.id, p);
        for (const n of SEED_NEEDS) this.needs.set(n.id, n);
        this.persist();
      }
      this.initialized = true;
    }
  }

  // ─── Profiles ──────────────────────────────────────────────
  addProfile(profile: UserProfile): void {
    this.ensureInit();
    this.profiles.set(profile.id, profile);
    this.persist();
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
      this.persist();
    }
  }

  // ─── Need Posts ────────────────────────────────────────────
  addNeed(need: NeedPost): void {
    this.ensureInit();
    this.needs.set(need.id, need);
    this.persist();
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
      this.persist();
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
    this.ensureInit();
    this.trades.set(trade.id, trade);
    this.persist();
  }

  getTrade(id: string): Trade | undefined {
    this.ensureInit();
    return this.trades.get(id);
  }

  getAllTrades(): Trade[] {
    this.ensureInit();
    return Array.from(this.trades.values());
  }

  getTradesByType<T extends Trade>(type: T["type"]): T[] {
    this.ensureInit();
    return Array.from(this.trades.values()).filter(
      (t) => t.type === type
    ) as T[];
  }

  getTradesForUser(userId: string): Trade[] {
    this.ensureInit();
    return Array.from(this.trades.values()).filter((t) => {
      if (t.type === "multi") return t.participants.includes(userId);
      return t.fromUserId === userId || t.toUserId === userId;
    });
  }

  updateTrade(id: string, updates: Partial<Trade>): void {
    this.ensureInit();
    const existing = this.trades.get(id);
    if (existing) {
      this.trades.set(id, { ...existing, ...updates } as Trade);
      this.persist();
    }
  }

  // ─── Multi-trade specific ─────────────────────────────────
  getAllMultiTrades(): MultiTrade[] {
    return this.getTradesByType<MultiTrade>("multi");
  }

  clearMultiTrades(): void {
    this.ensureInit();
    for (const [id, t] of this.trades) {
      if (t.type === "multi") this.trades.delete(id);
    }
    this.persist();
  }

  acceptMultiTrade(tradeId: string, userId: string): MultiTrade | null {
    this.ensureInit();
    const trade = this.trades.get(tradeId);
    if (!trade || trade.type !== "multi") return null;
    const mt = trade as MultiTrade;
    if (!mt.acceptedBy.includes(userId)) mt.acceptedBy.push(userId);
    if (mt.acceptedBy.length === mt.participants.length) mt.status = "executed";
    this.trades.set(tradeId, mt);
    this.persist();
    return mt;
  }

  declineMultiTrade(tradeId: string, userId: string): MultiTrade | null {
    this.ensureInit();
    const trade = this.trades.get(tradeId);
    if (!trade || trade.type !== "multi") return null;
    const mt = trade as MultiTrade;
    if (!mt.declinedBy.includes(userId)) mt.declinedBy.push(userId);
    mt.status = "declined";
    this.trades.set(tradeId, mt);
    this.persist();
    return mt;
  }

  // ─── Notifications ─────────────────────────────────────────
  addNotification(notification: AppNotification): void {
    this.ensureInit();
    if (notification.dedupeKey) {
      const existing = Array.from(this.notifications.values()).find(
        (n) => n.dedupeKey === notification.dedupeKey && n.profileId === notification.profileId
      );
      if (existing) return;
    }
    this.notifications.set(notification.id, notification);
    this.persist();
  }

  createNotification(input: Omit<AppNotification, "id" | "createdAt" | "read">): AppNotification {
    const notification: AppNotification = {
      id: `ntf-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      read: false,
      ...input,
    };
    this.addNotification(notification);
    return notification;
  }

  getNotificationsForProfile(profileId: string, unreadOnly = false): AppNotification[] {
    this.ensureInit();
    const list = Array.from(this.notifications.values())
      .filter((n) => n.profileId === profileId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return unreadOnly ? list.filter((n) => !n.read) : list;
  }

  markNotificationRead(notificationId: string, profileId: string): AppNotification | null {
    this.ensureInit();
    const existing = this.notifications.get(notificationId);
    if (!existing || existing.profileId !== profileId) return null;
    const updated = { ...existing, read: true };
    this.notifications.set(notificationId, updated);
    this.persist();
    return updated;
  }

  markAllNotificationsRead(profileId: string): number {
    this.ensureInit();
    let changed = 0;
    for (const [id, n] of this.notifications) {
      if (n.profileId === profileId && !n.read) {
        this.notifications.set(id, { ...n, read: true });
        changed++;
      }
    }
    if (changed > 0) this.persist();
    return changed;
  }

  // ─── Sessions ──────────────────────────────────────────────
  createSession(profileId: string, ttlMs = 1000 * 60 * 60 * 24 * 7): UserSession {
    this.ensureInit();
    this.pruneExpiredSessions();

    const now = Date.now();
    const session: UserSession = {
      token: `sess-${now}-${Math.random().toString(36).slice(2, 12)}`,
      profileId,
      createdAt: new Date(now).toISOString(),
      expiresAt: new Date(now + ttlMs).toISOString(),
    };

    this.sessions.set(session.token, session);
    this.persist();
    return session;
  }

  getSession(token: string): UserSession | null {
    this.ensureInit();
    this.pruneExpiredSessions();
    return this.sessions.get(token) || null;
  }

  deleteSession(token: string): void {
    this.ensureInit();
    if (this.sessions.delete(token)) {
      this.persist();
    }
  }

  // ─── Agent Log ─────────────────────────────────────────────
  logAgentStep(step: AgentStep): void {
    this.ensureInit();
    this.agentLog.push(step);
    if (this.agentLog.length > MAX_AGENT_LOG_STEPS) {
      this.agentLog = this.agentLog.slice(-MAX_AGENT_LOG_STEPS);
    }
    this.persist();
  }
  getAgentLog(): AgentStep[] {
    this.ensureInit();
    return [...this.agentLog];
  }
  clearAgentLog(): void {
    this.ensureInit();
    this.agentLog = [];
    this.persist();
  }

  setLastHeartbeat(value: string | null): void {
    this.ensureInit();
    this.lastHeartbeat = value;
    this.persist();
  }
}

// Singleton
const globalStore = globalThis as unknown as { __naibourStore?: InMemoryStore };
if (!globalStore.__naibourStore) {
  globalStore.__naibourStore = new InMemoryStore();
}
export const store = globalStore.__naibourStore;
