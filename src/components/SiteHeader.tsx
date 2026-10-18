import { useEffect, useRef, useState } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';
import { club, navLinks } from '@/data/team';

const MOBILE_NAV_ID = 'site-mobile-nav';

/**
 * Закреплённая шапка: на десктопе — горизонтальная навигация по разделам,
 * на мобильных — бургер с раскрывающейся панелью. Меню закрывается по
 * Escape, по выбору раздела и при переходе на десктопную ширину.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  /* Scroll-spy: подсвечиваем раздел, который сейчас в зоне экрана */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };

    const onResize = () => {
      /* Раскрытое меню имеет смысл только на мобильной ширине */
      if (window.matchMedia('(min-width: 768px)').matches) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur-sm">
      <div className="site-safe-pad mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-6 lg:px-10 xl:max-w-7xl">
        <a
          href="#top"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
          aria-label={`${club.shortName} — к началу страницы`}
        >
          <span className="font-display text-lg uppercase leading-none tracking-wide">
            {club.shortName}
          </span>
        </a>

        <nav aria-label="Разделы сайта" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={`nav-link inline-flex h-11 items-center rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] ${
                    active === link.href
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />

          <button
            ref={burgerRef}
            type="button"
            aria-expanded={open}
            aria-controls={MOBILE_NAV_ID}
            aria-label={open ? 'Закрыть меню разделов' : 'Открыть меню разделов'}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--line)] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] md:hidden"
          >
            {/* Иконка бургера/креста рисуется локально, без иконок-библиотек */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильная панель: обычный поток под шапкой, без оверлея —
          якорные переходы из неё скроллят документ предсказуемо */}
      {open && (
        <nav
          id={MOBILE_NAV_ID}
          aria-label="Разделы сайта — мобильное меню"
          className="site-safe-pad border-t border-[var(--line)] md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={`flex min-h-[44px] items-center rounded-md px-3 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] ${
                    active === link.href
                      ? 'bg-[var(--paper-2)] font-medium text-[var(--court)]'
                      : 'text-[var(--ink)] hover:bg-[var(--paper-2)]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-6xl px-5 pb-3 pt-1 sm:px-6 sm:hidden">
            {/* Переключатель темы доступен и в мобильном меню */}
            <ThemeToggle className="w-full justify-center" />
          </div>
        </nav>
      )}
    </header>
  );
}
