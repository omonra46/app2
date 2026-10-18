/**
 * Адрес файла из public/ с учётом base из vite.config.ts.
 * Без этого ссылки на фото ломаются при публикации в подпапку.
 */
export function publicUrl(file: string): string {
  return `${import.meta.env.BASE_URL}${file.replace(/^\/+/, '')}`;
}