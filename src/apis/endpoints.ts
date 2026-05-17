export const ENDPOINTS = {
  auth: {
    signup: "/v1/auth/signup",
    login: "/v1/auth/login",
    refresh: "/v1/auth/refresh",
    logout: "/v1/auth/logout",
  },
  me: {
    profile: "/v1/me",
    disclaimerAck: "/v1/me/disclaimer-ack",
    watchlist: "/v1/me/watchlist",
    watchlistItem: (ticker: string) => `/v1/me/watchlist/${ticker}`,
    history: "/v1/me/history",
    historyStats: "/v1/me/history/stats",
    historyItem: (analysisId: number) => `/v1/me/history/${analysisId}`,
  },
  risk: {
    spotlight: "/v1/risk/spotlight",
    verdict: (ticker: string) => `/v1/risk/${ticker}`,
    path: (ticker: string) => `/v1/risk/${ticker}/path`,
    attention: (ticker: string) => `/v1/risk/${ticker}/attention`,
  },
  tickers: {
    list: "/v1/tickers",
    search: "/v1/tickers/search",
  },
  prices: {
    latest: (target: string) => `/v1/prices/${target}`,
  },
  macro: {
    series: (code: string) => `/v1/macro/${code}`,
  },
} as const;
