/**
 * Placeholder landscape artwork shown wherever a real photograph has not
 * been supplied yet. Deterministic per `seed`, pure SVG (no network cost).
 * Replace by adding images to the category/stock data.
 */

const palettes = {
  dawn: { sky: ["#efe4cc", "#dcbf98"], sun: "#f3e6c9", hills: ["#b3a07a", "#8a8660", "#56633f", "#2b4331", "#172b1f"] },
  dusk: { sky: ["#e8d2b4", "#c48a63"], sun: "#f1dcbf", hills: ["#a68365", "#7d6a50", "#55563b", "#304232", "#1a2a1f"] },
  mist: { sky: ["#e6e4d6", "#cbc8b0"], sun: "#f2f0e4", hills: ["#adb095", "#8c9272", "#627052", "#3a5140", "#1d3226"] },
  dry: { sky: ["#f1e6cc", "#e1c893"], sun: "#f7edd6", hills: ["#c2a874", "#a18a5c", "#76704a", "#46533a", "#233628"] },
} as const;

export type ArtworkTone = keyof typeof palettes;

function rand(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return Math.abs(h);
}

function ridge(r: () => number, base: number, amp: number, W = 1600, H = 1000) {
  const step = 200;
  const pts: [number, number][] = [];
  for (let x = -step; x <= W + step; x += step) pts.push([x, base - r() * amp]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return `${d} L${W + step},${H} L${-step},${H} Z`;
}

export function Artwork({
  seed = "balilethu",
  tone,
  label,
  className = "",
  fence = true,
}: {
  seed?: string;
  tone?: ArtworkTone;
  label?: string;
  className?: string;
  fence?: boolean;
}) {
  const h = hash(seed);
  const tones = Object.keys(palettes) as ArtworkTone[];
  const p = palettes[tone ?? tones[h % tones.length]];
  const r = rand(h);
  const id = `a${h.toString(36)}`;
  const sunX = 300 + r() * 1000;
  const sunY = 260 + r() * 140;
  const layers = [
    { base: 560, amp: 140 },
    { base: 650, amp: 120 },
    { base: 740, amp: 110 },
    { base: 840, amp: 90 },
    { base: 940, amp: 60 },
  ].map((l, i) => ({ d: ridge(r, l.base, l.amp), fill: p.hills[i] }));
  const fenceY = 905;

  return (
    <div className={`grain absolute inset-0 overflow-hidden ${className}`} aria-hidden={label ? undefined : true}>
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role={label ? "img" : undefined}
        aria-label={label}
      >
        <defs>
          <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.sky[0]} />
            <stop offset="1" stopColor={p.sky[1]} />
          </linearGradient>
          <radialGradient id={`${id}g`}>
            <stop offset="0" stopColor={p.sun} stopOpacity="0.9" />
            <stop offset="1" stopColor={p.sun} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="1000" fill={`url(#${id}s)`} />
        <circle cx={sunX} cy={sunY} r="320" fill={`url(#${id}g)`} />
        <circle cx={sunX} cy={sunY} r="70" fill={p.sun} opacity="0.85" />
        {layers.map((l, i) => (
          <path key={i} d={l.d} fill={l.fill} />
        ))}
        {fence && (
          <g stroke={p.hills[4]} strokeWidth="3" opacity="0.55">
            <line x1="0" y1={fenceY - 30} x2="1600" y2={fenceY - 44} strokeWidth="1.5" />
            <line x1="0" y1={fenceY - 8} x2="1600" y2={fenceY - 20} strokeWidth="1.5" />
            {Array.from({ length: 17 }, (_, i) => {
              const x = i * 100 + 20;
              const top = fenceY - 60 - i * 0.8;
              return <line key={i} x1={x} y1={top} x2={x} y2={fenceY + 20} />;
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
