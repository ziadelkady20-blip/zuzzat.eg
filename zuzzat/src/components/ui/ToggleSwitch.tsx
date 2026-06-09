"use client";

interface Props {
  checked: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({ checked, onChange }: Props) {
  return (
    <label className="relative inline-block w-10 h-5 cursor-pointer">
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <div className={`w-10 h-5 rounded-full transition-colors ${checked ? "bg-[#1E3ABA]" : "bg-gray-200"}`}>
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </div>
    </label>
  );
}
