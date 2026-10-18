import { useEffect, useRef, useState } from 'react';

/**
 * Показывает блок, когда он попадает в область просмотра.
 * Возвращает ref для контейнера и флаг видимости для класса .is-visible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  /* Показываем сразу, если анимация не нужна или наблюдатель недоступен */
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (typeof IntersectionObserver === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (visible) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}