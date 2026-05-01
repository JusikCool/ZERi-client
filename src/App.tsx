import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import StockDetailPage from "./pages/stocks/StockDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stocks/:symbol" element={<StockDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
