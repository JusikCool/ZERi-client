import SearchBar from "../../components/home/SearchBar";
import BottomTabBar from "../../components/ui/BottomTabBar";

function SearchPage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pt-6 text-slate-900">
      <header className="px-1 pb-4 pt-1">
        <h1 className="text-[1.375rem] font-bold tracking-[-0.04em] text-slate-900">검색</h1>
      </header>
      <div className="px-1 pb-5">
        <SearchBar />
      </div>
      <BottomTabBar activeTab="search" />
    </div>
  );
}

export default SearchPage;
