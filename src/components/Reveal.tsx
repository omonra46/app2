import type { CSSProperties, ReactNode } from 'react';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Задержка появления в миллисекундах — для ступенчатых списков */
  delay?: number;
};

/** Обёртка плавного появления блока при прокрутке. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}