import { ENDPOINTS } from "../endpoints";
import http from "../http";
import type {
  ApiResponse,
  RiskAttentionData,
  RiskPathData,
  RiskVerdictData,
  SpotlightResponse,
} from "../types";

export async function getSpotlight(
  scope: "all" | "watchlist" = "watchlist",
): Promise<SpotlightResponse> {
  const res = await http.get<ApiResponse<SpotlightResponse>>(ENDPOINTS.risk.spotlight, {
    params: { scope },
  });
  return res.data.data;
}

export async function getRiskVerdict(ticker: string, record = false): Promise<RiskVerdictData> {
  const res = await http.get<ApiResponse<RiskVerdictData>>(ENDPOINTS.risk.verdict(ticker), {
    params: { record },
  });
  return res.data.data;
}

export async function getRiskPath(ticker: string): Promise<RiskPathData> {
  const res = await http.get<ApiResponse<RiskPathData>>(ENDPOINTS.risk.path(ticker));
  return res.data.data;
}

export async function getRiskAttention(ticker: string): Promise<RiskAttentionData> {
  const res = await http.get<ApiResponse<RiskAttentionData>>(ENDPOINTS.risk.attention(ticker));
  return res.data.data;
}
