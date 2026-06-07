"use client";
import { TABLES } from "@/lib/data";
import Button from "@/components/ui/Button";

function QRPattern() {
  return (
    <svg width="72" height="72" viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" fill="white"/>
      <rect x="4" y="4" width="22" height="22" fill="#1E3ABA"/><rect x="8" y="8" width="14" height="14" fill="white"/><rect x="11" y="11" width="8" height="8" fill="#1E3ABA"/>
      <rect x="34" y="4" width="22" height="22" fill="#1E3ABA"/><rect x="38" y="8" width="14" height="14" fill="white"/><rect x="41" y="11" width="8" height="8" fill="#1E3ABA"/>
      <rect x="4" y="34" width="22" height="22" fill="#1E3ABA"/><rect x="8" y="38" width="14" height="14" fill="white"/><rect x="11" y="41" width="8" height="8" fill="#1E3ABA"/>
      <rect x="34" y="34" width="4" height="4" fill="#1E3ABA"/><rect x="40" y="34" width="4" height="4" fill="#1E3ABA"/>
      <rect x="46" y="34" width="4" height="4" fill="#1E3ABA"/><rect x="52" y="34" width="4" height="4" fill="#1E3ABA"/>
      <rect x="34" y="40" width="4" height="4" fill="#1E3ABA"/><rect x="46" y="40" width="4" height="4" fill="#1E3ABA"/>
      <rect x="34" y="46" width="4" height="4" fill="#1E3ABA"/><rect x="40" y="46" width="4" height="4" fill="#1E3ABA"/>
      <rect x="52" y="46" width="4" height="4" fill="#1E3ABA"/><rect x="34" y="52" width="4" height="4" fill="#1E3ABA"/>
      <rect x="46" y="52" width="4" height="4" fill="#1E3ABA"/><rect x="52" y="52" width="4" height="4" fill="#1E3ABA"/>
    </svg>
  );
}

export default function QRPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-bold">QR Ordering System</h1>
          <p className="text-sm text-gray-400 mt-1">Scan to order directly from any table</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => alert("Printing all QR codes...")}>🖨 Print All QRs</Button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {TABLES.map(table => (
          <div key={table.id} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-20 h-20 bg-gray-50 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <QRPattern />
            </div>
            <div className="font-bold text-sm">{table.label}</div>
            <div className="text-[10px] text-gray-400 mt-1 mb-2">/order/table/{table.id}</div>
            <button className="w-full text-[11px] font-semibold text-[#1E3ABA] border border-[#1E3ABA] rounded-lg py-1.5 hover:bg-[#EEF1FF] transition-colors">
              📥 Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
