import { useNavigate } from "react-router-dom";
import { getRefreshToken } from "../../apis/auth";
import { logout } from "../../apis/authApi";

function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    const token = getRefreshToken();
    if (token) {
      try {
        await logout(token);
      } catch {
        // 토큰 만료 등 서버 오류여도 로컬 토큰은 이미 삭제됨
      }
    }
    navigate("/login", { replace: true });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full rounded-[20px] bg-white px-5 py-4 text-left text-[15px] font-medium text-rose-500 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition-colors active:bg-rose-50"
    >
      로그아웃
    </button>
  );
}

export default LogoutButton;
