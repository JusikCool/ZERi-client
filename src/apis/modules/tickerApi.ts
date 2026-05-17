import { ENDPOINTS } from "../endpoints";
import http from "../http";
import type { ApiResponse, TickerSearchItem } from "../types";

export async function searchTickers(q: string, limit = 20): Promise<TickerSearchItem[]> {
  const res = await http.get<
    ApiResponse<{ query: string; count: number; items: TickerSearchItem[] }>
  >(ENDPOINTS.tickers.search, { params: { q, limit } });
  return res.data.data.items;
}
