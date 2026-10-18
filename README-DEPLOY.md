# Деплой на Cloudflare Pages

Проект — статический SPA (Vite + React). Сборка: `npm run build`, результат в `dist/`.

## Настройки проекта в Cloudflare

| Параметр | Значение |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/.` (корень репозитория) |
| Node version | 20 (`.nvmrc`) или env `NODE_VERSION = 20` |

Файлы `public/_headers` и `public/_redirects` уже настроены:

- `_redirects` — SPA-fallback: любой неизвестный путь отдаёт `index.html`
  со статусом 200 (нужно для BrowserRouter);
- `_headers` — кэширование (хэшированные ассеты Vite immutable год,
  шрифты и фото — неделю) и базовые security-заголовки.

## Вариант 1: через Git (рекомендуется)

1. Запушьте проект в репозиторий GitHub/GitLab.
   `dist/` и `node_modules/` уже в `.gitignore`.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages →
   Connect to Git → выберите репозиторий.
3. Укажите настройки из таблицы выше → Save and Deploy.
4. Каждый пуш в основную ветку — продакшен-деплой, в остальные — preview.

## Вариант 2: через Wrangler CLI (без Git)

```bash
npm install -g wrangler
wrangler login

# Из корня проекта:
npm run build
wrangler pages deploy dist --project-name=meridian-bc
```

Первый деплой создаст проект `meridian-bc`, последующие — обновят его.

## Свой домен

Dashboard → ваш проект Pages → Custom domains → Set up a custom domain.
Введите домен (например, `meridian-bc.ru`); DNS-запись Cloudflare создаст
сам, если домен в том же аккаунте, иначе добавьте CNAME
`<имя-проекта>.pages.dev` у своего регистратора.

## Перед публикацией

- Замените демо-данные в `src/data/team.ts` реальными (клуб, игроки, календарь).
- В `index.html` замените `https://meridian-bc.ru/` в `og:url` и `og:image`
  на адрес реального домена после его привязки.

## Локальная проверка собранной версии

```bash
npm run build
npx wrangler pages dev dist
```

`wrangler pages dev` учитывает `_redirects` и `_headers`, в отличие от
`vite preview` — поведение совпадает с продакшеном.
