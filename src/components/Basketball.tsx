/**
 * Баскетбольный мяч. Размер задаётся родителем (.ball-anchor),
 * поэтому viewBox фиксированный, а пропорции держит aspect-ratio.
 */
export function Basketball() {
  return (
    <svg className="ball-art" viewBox="0 0 100 100" aria-hidden="true">
      <circle className="ball-leather" cx="50" cy="50" r="47" />
      {/* Швы: вертикаль, горизонталь и две дуги — узнаваемый рисунок мяча */}
      <path className="ball-seam" d="M50 3v94" />
      <path className="ball-seam" d="M3 50h94" />
      <path className="ball-seam" d="M50 3c-19 24-19 70 0 94" />
      <path className="ball-seam" d="M50 3c19 24 19 70 0 94" />
    </svg>
  );
}