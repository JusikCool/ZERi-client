import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../apis/authApi";
import { parseApiError } from "../../apis/error";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      const apiError = parseApiError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#f2f4f6] px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold text-slate-900">ZERi</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="px-5 py-4">
              <label className="mb-1 block text-xs font-medium text-slate-500">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                required
                className="w-full bg-transparent text-[15px] text-slate-900 placeholder-slate-300 outline-none"
              />
            </div>
            <div className="mx-5 h-px bg-slate-100" />
            <div className="px-5 py-4">
              <label className="mb-1 block text-xs font-medium text-slate-500">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                className="w-full bg-transparent text-[15px] text-slate-900 placeholder-slate-300 outline-none"
              />
            </div>
            <div className="mx-5 h-px bg-slate-100" />
            <div className="px-5 py-4">
              <label className="mb-1 block text-xs font-medium text-slate-500">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                className="w-full bg-transparent text-[15px] text-slate-900 placeholder-slate-300 outline-none"
              />
            </div>
          </div>
          {error && <p className="px-1 text-sm text-rose-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[20px] bg-slate-900 py-4 text-[15px] font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-50"
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="font-medium text-slate-900 underline underline-offset-2">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
