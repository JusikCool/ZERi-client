function SearchBar() {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 text-slate-400"
      >
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 11L14 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        placeholder="티커 또는 종목명 검색"
        className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
