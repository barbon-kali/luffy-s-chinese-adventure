type Mood = "idle" | "excited" | "shocked";

/**
 * Stylized chibi pirate mascot drawn as SVG.
 * Generic anime-inspired character — no copyrighted likeness.
 */
export function LuffySprite({ mood = "idle", className = "" }: { mood?: Mood; className?: string }) {
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label="مرشد المغامرة">
      {/* halftone backdrop */}
      <defs>
        <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="320" height="320" fill="url(#dots)" className="text-luffy-red" />

      {/* speed lines for excited */}
      {mood === "excited" && (
        <g stroke="#E11D48" strokeWidth="2" opacity="0.55">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={160 + Math.cos(a) * 90}
                y1={160 + Math.sin(a) * 90}
                x2={160 + Math.cos(a) * 150}
                y2={160 + Math.sin(a) * 150}
              />
            );
          })}
        </g>
      )}

      {/* neck */}
      <rect x="142" y="220" width="36" height="30" fill="#F4C7A8" stroke="#18181B" strokeWidth="3" />
      {/* red vest collar */}
      <path d="M100 250 L160 230 L220 250 L240 300 L80 300 Z" fill="#E11D48" stroke="#18181B" strokeWidth="3" />

      {/* head */}
      <ellipse cx="160" cy="170" rx="78" ry="80" fill="#F4C7A8" stroke="#18181B" strokeWidth="4" />

      {/* hair */}
      <path
        d="M88 150 C90 90 140 70 160 80 C185 65 235 95 232 158 C220 130 200 122 180 130 C170 110 145 110 135 132 C115 125 100 132 88 150 Z"
        fill="#18181B"
      />

      {/* straw hat brim */}
      <ellipse cx="160" cy="100" rx="120" ry="22" fill="#FACC15" stroke="#18181B" strokeWidth="4" />
      {/* hat top */}
      <path
        d="M105 100 Q160 35 215 100 Z"
        fill="#FACC15"
        stroke="#18181B"
        strokeWidth="4"
      />
      {/* hat band */}
      <path d="M110 96 Q160 70 210 96" stroke="#E11D48" strokeWidth="10" fill="none" />
      {/* hat weave lines */}
      <path d="M120 90 Q160 55 200 90" stroke="#C9A227" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* scar under left eye */}
      <path d="M118 175 l10 8 l-4 6" stroke="#18181B" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* eyes */}
      {mood === "idle" && (
        <>
          <circle cx="135" cy="178" r="6" fill="#18181B" />
          <circle cx="190" cy="178" r="6" fill="#18181B" />
        </>
      )}
      {mood === "excited" && (
        <>
          {/* sparkle stars */}
          {[
            { cx: 135, cy: 178 },
            { cx: 190, cy: 178 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.cx} cy={p.cy} r="10" fill="#FACC15" stroke="#18181B" strokeWidth="2" />
              <path
                d={`M${p.cx} ${p.cy - 8} L${p.cx + 2} ${p.cy - 2} L${p.cx + 8} ${p.cy} L${p.cx + 2} ${p.cy + 2} L${p.cx} ${p.cy + 8} L${p.cx - 2} ${p.cy + 2} L${p.cx - 8} ${p.cy} L${p.cx - 2} ${p.cy - 2} Z`}
                fill="#18181B"
              />
            </g>
          ))}
        </>
      )}
      {mood === "shocked" && (
        <>
          <circle cx="135" cy="176" r="12" fill="white" stroke="#18181B" strokeWidth="3" />
          <circle cx="190" cy="176" r="12" fill="white" stroke="#18181B" strokeWidth="3" />
          <circle cx="135" cy="176" r="3" fill="#18181B" />
          <circle cx="190" cy="176" r="3" fill="#18181B" />
          {/* sweat */}
          <path d="M225 145 q6 14 0 22 q-6 -8 0 -22 z" fill="#7FB7E8" stroke="#18181B" strokeWidth="2" />
        </>
      )}

      {/* mouth */}
      {mood === "idle" && (
        <path d="M138 210 Q160 222 182 210" stroke="#18181B" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {mood === "excited" && (
        <g>
          <path
            d="M115 200 Q160 260 205 200 Q200 235 160 240 Q120 235 115 200 Z"
            fill="#7A1029"
            stroke="#18181B"
            strokeWidth="3"
          />
          {/* teeth line */}
          <path d="M118 205 Q160 215 202 205" stroke="white" strokeWidth="6" fill="none" />
        </g>
      )}
      {mood === "shocked" && (
        <ellipse cx="160" cy="218" rx="14" ry="18" fill="#7A1029" stroke="#18181B" strokeWidth="3" />
      )}
    </svg>
  );
}
