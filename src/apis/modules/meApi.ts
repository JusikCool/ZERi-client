import { ENDPOINTS } from "../endpoints";
import http from "../http";
import type { ApiResponse, HistoryStats, UserPublic, WatchlistItem } from "../types";

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

export async function addToWatchlist(ticker: string): Promise<WatchlistItem> {
  const res = await http.post<ApiResponse<{ item: WatchlistItem }>>(ENDPOINTS.me.watchlist, {
    ticker,
  });
  return res.data.data.item;
}

export async function removeFromWatchlist(ticker: string): Promise<void> {
  await http.delete(ENDPOINTS.me.watchlistItem(ticker));
}

export async function getHistoryStats(): Promise<HistoryStats> {
  const res = await http.get<ApiResponse<HistoryStats>>(ENDPOINTS.me.historyStats);
  return res.data.data;
}
