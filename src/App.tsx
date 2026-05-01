import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import StockDetailPage from "./pages/stocks/StockDetailPage";
import StockWhyPage from "./pages/stocks/StockWhyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stocks/:symbol" element={<StockDetailPage />} />
      <Route path="/stocks/:symbol/why" element={<StockWhyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
