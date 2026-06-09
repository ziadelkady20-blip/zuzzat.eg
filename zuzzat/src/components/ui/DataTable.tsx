interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  children: React.ReactNode;
}

export default function DataTable({ columns, children }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
