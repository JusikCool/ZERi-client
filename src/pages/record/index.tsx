import RecordItemCard from "../../components/stock/RecordItemCard";
import { mockRecordData } from "../../data/mockRecordData";

function RecordPage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pt-6 text-slate-900">
      <header className="px-1 pb-4 pt-1">
        <h1 className="text-[1.375rem] font-bold tracking-[-0.04em] text-slate-900">기록</h1>
      </header>
      <main className="space-y-3 pb-28">
        {mockRecordData.map((item) => (
          <RecordItemCard key={item.id} item={item} />
        ))}
        <p className="px-1 pt-2 text-center text-[11px] leading-5 text-slate-400">
          투자 판단과 손실은 투자자 본인에게 귀속됩니다.
        </p>
      </main>
    </div>
  );
}

export default RecordPage;
