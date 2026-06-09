interface Props {
  percent: number;
  color: string;
}

export default function ProgressBar({ percent, color }: Props) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${percent}%`, background: color }}
      />
    </div>
  );
}
