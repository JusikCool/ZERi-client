import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import HomePage from "./pages/home";
import MyPage from "./pages/my";
import RecordPage from "./pages/record";
import SearchPage from "./pages/search";
import StockDetailPage from "./pages/stocks/StockDetailPage";
import StockWhyPage from "./pages/stocks/StockWhyPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/stocks/:symbol" element={<StockDetailPage />} />
        <Route path="/stocks/:symbol/why" element={<StockWhyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
