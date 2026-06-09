interface Props {
  size?: number;
  variant?: "colored" | "white" | "dark";
}

export default function ZuzzatLogo({ size = 36, variant = "colored" }: Props) {
  const isWhite = variant === "white";
  const faceFill = isWhite ? "rgba(255,255,255,0.2)" : "#EEF1FF";
  const faceStroke = isWhite ? "white" : "#1E3ABA";
  const faceStrokeWidth = isWhite ? "2" : "2.5";
  const innerFill = "white";
  const innerStroke = isWhite ? undefined : "#1E3ABA";
  const innerStrokeWidth = isWhite ? undefined : "2";
  const dotFill = "#1E3ABA";
  const hatFill = isWhite ? "rgba(255,255,255,0.85)" : "#1E3ABA";

  return (
    <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
      <circle cx="55" cy="50" r="36" fill={faceFill} stroke={faceStroke} strokeWidth={faceStrokeWidth} />
      <ellipse cx="55" cy="51" rx="17" ry="19" fill={innerFill} stroke={innerStroke} strokeWidth={innerStrokeWidth} />
      <circle cx="48" cy="49" r="2.8" fill={dotFill} />
      <circle cx="62" cy="49" r="2.8" fill={dotFill} />
      <path d="M48 57 Q55 65 62 57" stroke={dotFill} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M35 23 Q55 8 75 23 L73 34 Q55 24 37 34Z" fill={hatFill} />
    </svg>
  );
}
