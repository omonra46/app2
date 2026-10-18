import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { ThemeContext, type ThemeContextValue } from '@/hooks/useTheme';
import {
  applyTheme,
  readInitialTheme,
  resolveTheme,
  storeTheme,
  subscribeSystemTheme,
  systemPrefersDark,
  type Theme,
} from '@/lib/theme';

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * Хранит выбранную тему, применяет её к документу и отдаёт приложению.
 *
 * Системная настройка читается через useSyncExternalStore: если пользователь
 * выбрал «как в системе» и поменял тему в ОС, страница переключится сразу.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  /* Стартовое значение совпадает с тем, что уже применил скрипт из index.html,
     иначе первый кадр после гидратации мигнул бы другой темой */
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);
  const prefersDark = useSyncExternalStore(subscribeSystemTheme, systemPrefersDark, () => false);

  const resolvedTheme = resolveTheme(theme, prefersDark);

  useEffect(() => {
    applyTheme(theme, resolvedTheme);
  }, [theme, resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    storeTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    /* Переключаем противоположную ВИДИМУЮ тему, а не следующий пункт списка:
       старый цикл светлая → тёмная → системная давал «мёртвый» клик — из тёмной
       в «как в системе», которая при тёмной ОС тоже тёмная. Теперь каждый клик
       реально меняет цвет страницы. */
    setThemeState((current) => {
      const resolved = resolveTheme(current, prefersDark);
      const next: Theme = resolved === 'dark' ? 'light' : 'dark';
      storeTheme(next);
      return next;
    });
  }, [prefersDark]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}