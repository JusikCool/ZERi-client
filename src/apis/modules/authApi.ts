import { clearAllTokens, setAccessToken, setRefreshToken } from "../auth";
import { ENDPOINTS } from "../endpoints";
import http from "../http";
import type { ApiResponse, TokenPair, UserPublic } from "../types";

type AuthData = {
  user: UserPublic;
  tokens: TokenPair;
};

function saveTokens(tokens: TokenPair) {
  setAccessToken(tokens.access_token);
  setRefreshToken(tokens.refresh_token);
}

export async function login(email: string, password: string): Promise<UserPublic> {
  const res = await http.post<ApiResponse<AuthData>>(ENDPOINTS.auth.login, { email, password });
  saveTokens(res.data.data.tokens);
  return res.data.data.user;
}

export async function signup(name: string, email: string, password: string): Promise<UserPublic> {
  const res = await http.post<ApiResponse<AuthData>>(ENDPOINTS.auth.signup, {
    name,
    email,
    password,
    disclaimer_code: "MAIN_V1",
  });
  saveTokens(res.data.data.tokens);
  return res.data.data.user;
}

export async function logout(refreshToken: string): Promise<void> {
  await http.post(ENDPOINTS.auth.logout, { refresh_token: refreshToken });
  clearAllTokens();
}
