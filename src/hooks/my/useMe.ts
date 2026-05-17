import { useEffect, useState } from "react";
import { getMe } from "../../apis/modules/meApi";
import { ApiClientError } from "../../apis/error";
import { useAuthStore } from "../../stores/authStore";

export function useMe() {
  const { user, setUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) return;
    async function fetchMe() {
      try {
        const fetched = await getMe();
        setUser(fetched);
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : "사용자 정보를 불러오지 못했어요.");
      }
    }
    fetchMe();
  }, [user, setUser]);

  return { user, error };
}
