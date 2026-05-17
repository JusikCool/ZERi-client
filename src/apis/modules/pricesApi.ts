import { ENDPOINTS } from "../endpoints";
import http from "../http";
import type { ApiResponse, LatestPriceItem, PricesResponse } from "../types";

export async function getPrices(ticker: string): Promise<LatestPriceItem[]> {
  const res = await http.get<ApiResponse<PricesResponse>>(ENDPOINTS.prices.latest(ticker));
  return res.data.data.items;
}
