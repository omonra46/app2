import { createContext, useContext } from 'react';

import type { ResolvedTheme, Theme } from '@/lib/theme';

/** Состояние темы, которое ThemeProvider отдаёт приложению. */
export type ThemeContextValue = {
  /** Выбор пользователя: светлая, тёмная или как в системе */
  theme: Theme;
  /** Тема, которая реально показана на странице */
  resolvedTheme: ResolvedTheme;
  /** Переключить на конкретный режим */
  setTheme: (theme: Theme) => void;
  /** Перейти к следующему режиму по кругу */
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Доступ к теме. Вне ThemeProvider — явная ошибка, а не тихий undefined. */
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme нужно вызывать внутри ThemeProvider');
  return value;
}