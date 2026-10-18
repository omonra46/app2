/**
 * Тема оформления: выбор пользователя, его хранение и применение к документу.
 * Здесь только чистые функции без React — так тема читается и до загрузки
 * бандла (см. инлайн-скрипт в index.html), и внутри приложения.
 */

/** Что выбрал пользователь: светлая, тёмная или как в системе. */
export type Theme = 'light' | 'dark' | 'system';

/** Тема, которая реально показана на странице. */
export type ResolvedTheme = 'light' | 'dark';

/** Порядок переключения кнопкой темы. */
export const THEMES = ['light', 'dark', 'system'] as const;

/** Ключ, под которым выбор лежит в localStorage. */
export const THEME_STORAGE_KEY = 'meridian-theme';

/** Цвет адресной строки браузера — совпадает с --paper каждой темы. */
export const THEME_COLOR: Record<ResolvedTheme, string> = {
  light: '#f5f4f1',
  dark: '#12141a',
};

/** Подписи для переключателя темы и подсказок. */
export const THEME_LABEL: Record<Theme, string> = {
  light: 'Светлая',
  dark: 'Тёмная',
  system: 'Как в системе',
};

/** Следующий режим по кругу: светлая → тёмная → как в системе. */
export function nextTheme(theme: Theme): Theme {
  const index = THEMES.indexOf(theme);
  return THEMES[(index + 1) % THEMES.length];
}

/** Проверяет, что значение из хранилища — действительно режим темы. */
export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

/** Системная тема. Вне браузера считаем, что светлая. */
export function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Подписка на смену системной темы — для useSyncExternalStore.
 * Возвращает функцию отписки.
 */
export function subscribeSystemTheme(onChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/** Сводит выбор пользователя и системную настройку в конкретную тему. */
export function resolveTheme(theme: Theme, prefersDark: boolean): ResolvedTheme {
  if (theme === 'system') return prefersDark ? 'dark' : 'light';
  return theme;
}

/** Читает сохранённый выбор; без него — «как в системе». */
export function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : 'system';
  } catch {
    /* Приватный режим может запрещать доступ к localStorage */
    return 'system';
  }
}

/**
 * Начальный выбор для провайдера. Сначала смотрим на data-theme, который
 * выставил инлайн-скрипт: он уже прочитал хранилище, поэтому состояние
 * приложения не разойдётся с тем, что видит пользователь.
 */
export function readInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const applied = document.documentElement.dataset.theme;
    if (isTheme(applied)) return applied;
  }
  return readStoredTheme();
}

/** Запоминает выбор между заходами. Недоступное хранилище — не ошибка. */
export function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* Выбор просто не переживёт перезагрузку */
  }
}

/**
 * Применяет тему к документу. Класс .dark включает токены из index.css,
 * data-атрибуты нужны для отладки и стилей, meta — цвет адресной строки.
 */
export function applyTheme(theme: Theme, resolved: ResolvedTheme): void {
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.dataset.theme = theme;
  root.dataset.themeResolved = resolved;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLOR[resolved]);
}