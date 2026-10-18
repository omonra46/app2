import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';
import { THEME_LABEL, type Theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

/** Иконка для каждого режима темы. */
const THEME_ICON: Record<Theme, LucideIcon> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

type ThemeToggleProps = {
  className?: string;
};

/**
 * Кнопка переключения темы: меняет видимую тему на противоположную.
 * Текущий режим виден по иконке, полное название — в подсказке и для скринридера.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const Icon = THEME_ICON[theme];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-11 items-center gap-2 rounded-md border border-[var(--line)] px-3',
        'text-[var(--ink-soft)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]',
        'hover:text-[var(--ink)]',
        className,
      )}
      /* Подсказка честно говорит, что именно произойдёт после клика */
      title={`Тема: ${THEME_LABEL[theme]}. Переключить на ${
        resolvedTheme === 'dark' ? 'светлую' : 'тёмную'
      }`}
      aria-label={`Тема: ${THEME_LABEL[theme]}. Переключить на ${
        resolvedTheme === 'dark' ? 'светлую' : 'тёмную'
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs uppercase tracking-[0.14em]">{THEME_LABEL[theme]}</span>
    </button>
  );
}