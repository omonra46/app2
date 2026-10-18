import { useEffect, useRef, useState } from 'react';

import { clamp, smoothstep } from '@/lib/motion';

/**
 * Таймлайн сцены: доли общего прогресса прокрутки секции.
 * Порядок фаз задаёт прямой сценарий, обратный скролл проигрывает его назад.
 */
const PHASE = {
  /** Видео проявляется из темноты */
  videoIn: [0.02, 0.12],
  /** Сцена уступает место галерее */
  exit: [0.62, 0.72],
  /** Появление кадров с матчей */
  photos: [0.64, 0.9],
} as const;

/** Раскладывает прогресс по фазам и пишет CSS-переменные на элемент секции. */
function applyProgress(node: HTMLElement, p: number) {
  const videoIn = smoothstep(PHASE.videoIn[0], PHASE.videoIn[1], p);
  const sceneOut = smoothstep(PHASE.exit[0], PHASE.exit[1], p);

  const style = node.style;
  const set = (name: string, value: string) => style.setProperty(name, value);

  set('--p', p.toFixed(4));
  /* Тёплое свечение за кольцом: разгорается по ходу сцены */
  set('--veil', smoothstep(0.1, 0.5, p).toFixed(4));
  /* Вуаль и видео уходят вместе, открывая страницу под галереей */
  set('--veil-out', (1 - sceneOut).toFixed(4));
  set('--video-in', (videoIn * (1 - sceneOut)).toFixed(4));
  set('--photo', smoothstep(PHASE.photos[0], PHASE.photos[1], p).toFixed(4));
}

/**
 * Превращает прокрутку секции в прогресс сценария: пишет CSS-переменные
 * прямо на элемент, без ререндеров React. Возвращает ref секции и
 * признак включённого «уменьшения движения».
 *
 * onProgress вызывается тем же числом p, что пишется в --p, — на каждое
 * измерение, без ререндеров. Опционально: нужен, когда прогресс уходит
 * наружу (например, в скраб видео), минуя CSS-переменные.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>(
  onProgress?: (p: number) => void,
) {
  const ref = useRef<T | null>(null);
  const [reduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  /* Колбэк живёт в ref: замыкание всегда свежее, пересоздавать эффект не нужно */
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* При уменьшении движения показываем итоговый кадр без анимации */
    if (reduced) {
      applyProgress(node, 1);
      return;
    }

    let frame = 0;
    let active = false;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? clamp(-rect.top / travel) : 0;
      applyProgress(node, p);
      onProgressRef.current?.(p);
    };

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    const start = () => {
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request);
      measure();
    };

    const stop = () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };

    /* Следим за прокруткой только пока секция на экране */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible === active) return;
        active = visible;
        if (active) start();
        else stop();
      },
      { rootMargin: '20% 0px' },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      stop();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return { ref, reduced };
}