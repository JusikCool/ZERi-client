import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { setUnauthorizedHandler } from "./apis/http";
import PrivateRoute from "./components/auth/PrivateRoute";
import AppLayout from "./components/ui/AppLayout";
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

  useEffect(() => {
    setUnauthorizedHandler(() => navigate("/login", { replace: true }));
  }, [navigate]);

  return (
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
  );
}

export default App;
