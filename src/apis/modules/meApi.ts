import { ENDPOINTS } from "../endpoints";
import http from "../http";
import type { ApiResponse, HistoryItem, HistoryStats, UserPublic, WatchlistItem } from "../types";

export async function getMe(): Promise<UserPublic> {
  const res = await http.get<ApiResponse<{ user: UserPublic }>>(ENDPOINTS.me.profile);
  return res.data.data.user;
}

export async function getWatchlist(): Promise<WatchlistItem[]> {
  const res = await http.get<ApiResponse<{ count: number; items: WatchlistItem[] }>>(
    ENDPOINTS.me.watchlist,
  );
  return res.data.data.items;
}

export async function getHistoryStats(): Promise<HistoryStats> {
  const res = await http.get<ApiResponse<HistoryStats>>(ENDPOINTS.me.historyStats);
  return res.data.data;
}

export async function getHistory(
  limit = 20,
  cursor?: string,
): Promise<{ items: HistoryItem[]; nextCursor: string | null }> {
  const res = await http.get<ApiResponse<{ items: HistoryItem[]; total_count: number }>>(
    ENDPOINTS.me.history,
    { params: { limit, ...(cursor ? { cursor } : {}) } },
  );
  return {
    items: res.data.data.items,
    nextCursor: res.data.meta?.next_cursor ?? null,
  };
}
