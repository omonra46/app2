/**
 * Математика скролл-анимации: фазы таймлайна, easing и кривые траекторий.
 * Держим отдельно от компонентов, чтобы сценарий описывался числами.
 */

/** Ограничивает значение отрезком [min, max]. */
export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

/** Линейная интерполяция. */
export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Плавное начало и конец: 0 до edge0, 1 после edge1. */
export function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Разгон в начале и мягкий финал — для броска мяча. */
export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/** Мягкий разгон — для падения мяча в кольцо. */
export function easeInQuad(t: number): number {
  return t * t;
}

/**
 * Импульс: 0 до riseStart, 1 в точке peak, снова 0 после fallEnd.
 * Нужен для коротких реакций — например, сетка кольца в момент попадания.
 */
export function bell(value: number, riseStart: number, peak: number, fallEnd: number): number {
  if (value <= riseStart || value >= fallEnd) return 0;
  return value < peak
    ? smoothstep(riseStart, peak, value)
    : 1 - smoothstep(peak, fallEnd, value);
}

/** Точка на квадратичной кривой Безье — дуга полёта мяча. */
export function quadBezier(from: number, control: number, to: number, t: number): number {
  const rest = 1 - t;
  return rest * rest * from + 2 * rest * t * control + t * t * to;
}