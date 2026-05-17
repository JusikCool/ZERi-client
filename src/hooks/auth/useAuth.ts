import { useState } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  signup as apiSignup,
} from "../../apis/modules/authApi";
import { ApiClientError } from "../../apis/error";
import { getRefreshToken } from "../../apis/auth";
import { useAuthStore } from "../../stores/authStore";

export function useAuth() {
  const { setUser, clearUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string): Promise<boolean> {
    setError(null);
    setLoading(true);
    try {
      const user = await apiLogin(email, password);
      setUser(user);
      return true;
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "알 수 없는 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function signup(name: string, email: string, password: string): Promise<boolean> {
    setError(null);
    setLoading(true);
    try {
      const user = await apiSignup(name, email, password);
      setUser(user);
      return true;
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "알 수 없는 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    try {
      await apiLogout(getRefreshToken() ?? "");
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "로그아웃 중 오류가 발생했습니다.");
    } finally {
      clearUser();
    }
  }

  return { login, signup, logout, loading, error };
}
