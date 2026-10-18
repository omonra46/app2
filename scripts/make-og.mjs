// Разовая утилита: og-cover.png (1200x630) и apple-touch-icon.png (180x180)
// в фирменной палитре клуба. Не участвует в сборке приложения.
const sharp = (await import('sharp')).default;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#12141a"/>
  <circle cx="920" cy="330" r="230" fill="none" stroke="#e2711d" stroke-width="26"/>
  <path d="M700 330h440M920 110v440" stroke="#e2711d" stroke-width="26"/>
  <path d="M765 175c95 95 95 415 0 510M1075 175c-95 95-95 415 0 510" fill="none" stroke="#e2711d" stroke-width="26"/>
  <text x="90" y="300" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#eceef2">МЕРИДИАН</text>
  <text x="90" y="380" font-family="Arial, sans-serif" font-size="44" fill="#9a9ca4">Баскетбольный клуб · Москва</text>
  <text x="90" y="450" font-family="Arial, sans-serif" font-size="36" fill="#e2711d">Играем в пас, играем на команду</text>
</svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" rx="36" fill="#12141a"/>
  <circle cx="90" cy="90" r="46" fill="none" stroke="#e2711d" stroke-width="8"/>
  <path d="M44 90h92M90 44v92" stroke="#e2711d" stroke-width="8"/>
  <path d="M58 58c19 19 19 45 0 64M122 58c-19 19-19 45 0 64" fill="none" stroke="#e2711d" stroke-width="8"/>
</svg>`;

(async () => {
  await sharp(Buffer.from(ogSvg)).png().toFile('public/og-cover.png');
  await sharp(Buffer.from(iconSvg)).png().toFile('public/apple-touch-icon.png');
  console.log('done');
})();
