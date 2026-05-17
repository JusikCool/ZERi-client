import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { setUnauthorizedHandler } from "./apis/http";
import PrivateRoute from "./components/auth/PrivateRoute";
import AppLayout from "./components/ui/AppLayout";
import { useAuthStore } from "./stores/authStore";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home";
import MyPage from "./pages/my";
import RecordPage from "./pages/record";
import SearchPage from "./pages/search";
import StockDetailPage from "./pages/stocks/StockDetailPage";
import StockWhyPage from "./pages/stocks/StockWhyPage";

function App() {
  const navigate = useNavigate();
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearUser();
      navigate("/login", { replace: true });
    });
  }, [navigate, clearUser]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 500,
            padding: "10px 16px",
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/record" element={<RecordPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/stocks/:symbol" element={<StockDetailPage />} />
            <Route path="/stocks/:symbol/why" element={<StockWhyPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
