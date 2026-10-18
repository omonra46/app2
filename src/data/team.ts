import type {
  Arena,
  Club,
  Coach,
  Game,
  MatchPhoto,
  NewsItem,
  Partner,
  Player,
  StandingRow,
} from '@/types/team';

export const club: Club = {
  name: 'Баскетбольный клуб «Меридиан»',
  shortName: 'Меридиан',
  city: 'Москва',
  founded: 2011,
  league: 'Лига «Столица» · Дивизион А',
  slogan: 'Играем в пас, играем на команду',
  phoneDisplay: '+7 495 000-00-00',
  phoneHref: 'tel:+74950000000',
  email: 'hello@meridian-bc.ru',
  headquarters: 'Москва, ул. Примерная, 12, спорткомплекс «Меридиан»',
  telegram: 'https://t.me/meridian_bc',
  vk: 'https://vk.com/meridian_bc',
  youtube: 'https://youtube.com/@meridian_bc',
};

export const arena: Arena = {
  name: 'Спорткомплекс «Меридиан»',
  address: 'Москва, ул. Примерная, 12',
  capacity: 1800,
  travel: 'м. Чистые пруды, 5 минут пешком. Парковка — 120 мест, въезд с Примерного переулка.',
  ticketUrl: 'https://meridian-bc.ru/tickets',
};

/**
 * Состав основной команды. Числа — средние за прошлый сезон,
 * это демонстрационные данные клуба.
 */
export const players: Player[] = [
  {
    id: 'volkov',
    number: 4,
    name: 'Артём Волков',
    position: 'PG',
    positionLabel: 'Разыгрывающий',
    height: 188,
    born: 1997,
    from: '«Вымпел», Казань',
    ppg: 14.2,
    rpg: 3.4,
    apg: 7.1,
    fg: 46.8,
    ft: 84.5,
  },
  {
    id: 'gordeev',
    number: 7,
    name: 'Никита Гордеев',
    position: 'SG',
    positionLabel: 'Атакующий защитник',
    height: 193,
    born: 1999,
    from: 'Академия «Меридиан»',
    ppg: 16.8,
    rpg: 4.1,
    apg: 3.2,
    fg: 44.1,
    ft: 88.0,
  },
  {
    id: 'sadykov',
    number: 11,
    name: 'Рустам Садыков',
    position: 'SF',
    positionLabel: 'Лёгкий форвард',
    height: 199,
    born: 1996,
    from: '«Заря», Уфа',
    ppg: 12.5,
    rpg: 6.3,
    apg: 2.8,
    fg: 49.2,
    ft: 76.4,
  },
  {
    id: 'karpov',
    number: 23,
    name: 'Дмитрий Карпов',
    position: 'PF',
    positionLabel: 'Тяжёлый форвард',
    height: 204,
    born: 1994,
    from: '«Север», Череповец',
    ppg: 11.1,
    rpg: 8.7,
    apg: 1.9,
    fg: 51.5,
    ft: 71.2,
  },
{
    id: 'isaev',
    number: 33,
    name: 'Магомед Исаев',
    position: 'C',
    positionLabel: 'Центровой',
    height: 211,
    born: 1995,
    from: '«Каспий», Махачкала',
    ppg: 13.6,
    rpg: 10.4,
    apg: 1.4,
    fg: 57.3,
    ft: 63.8,
  },
  {
    id: 'lebedev',
    number: 9,
    name: 'Антон Лебедев',
    position: 'SG',
    positionLabel: 'Атакующий защитник',
    height: 191,
    born: 2001,
    from: 'Академия «Меридиан»',
    ppg: 8.9,
    rpg: 2.6,
    apg: 2.1,
    fg: 42.7,
    ft: 79.3,
  },
  {
    id: 'zorin',
    number: 14,
    name: 'Павел Зорин',
    position: 'PF',
    positionLabel: 'Тяжёлый форвард',
    height: 202,
    born: 2000,
    from: '«Рикошет», Тула',
    ppg: 7.4,
    rpg: 5.2,
    apg: 1.2,
    fg: 48.0,
    ft: 69.5,
  },
  {
    id: 'kurbanov',
    number: 17,
    name: 'Тимур Курбанов',
    position: 'PG',
    positionLabel: 'Разыгрывающий',
    height: 185,
    born: 2002,
    from: 'Академия «Меридиан»',
    ppg: 6.2,
    rpg: 1.9,
    apg: 4.3,
    fg: 41.3,
    ft: 81.7,
  },
];

export const coaches: Coach[] = [
  {
    id: 'rybakov',
    name: 'Сергей Рыбаков',
    role: 'Главный тренер',
    note: 'Стаж 18 лет · сезон 2026/27 — четвёртый в клубе',
  },
  {
    id: 'gontar',
    name: 'Илья Гонтарь',
    role: 'Тренер по нападению',
    note: 'Отвечает за позиционное нападение и работу с броском',
  },
  {
    id: 'mironova',
    name: 'Ольга Миронова',
    role: 'Тренер по физподготовке',
    note: 'Функциональная диагностика и профилактика травм',
  },
  {
    id: 'adzhiev',
    name: 'Руслан Аджиев',
    role: 'Тренер по защите',
    note: 'Разбор видео и персональные задания на матч',
  },
];

/**
 * Календарь сезона 2026/27.
 * Даты в ISO; матчи без четвертей — ещё не сыграны.
 */
export const games: Game[] = [
  {
    id: 'g-01',
    date: '2026-09-05T18:30:00+03:00',
    opponent: '«Сокол»',
    venue: 'home',
    arena: arena.name,
    competition: 'Регулярный сезон',
    quarters: [
      { team: 24, opponent: 19 },
      { team: 18, opponent: 22 },
      { team: 27, opponent: 20 },
      { team: 21, opponent: 25 },
    ],
    scored: 90,
    conceded: 86,
    note: 'Гордеев — 27 очков, лучший матч старта сезона',
  },
  {
    id: 'g-02',
    date: '2026-09-13T19:00:00+03:00',
    opponent: '«Динамо-Б»',
    venue: 'away',
    arena: 'Дворец спорта «Пресня»',
    competition: 'Регулярный сезон',
    quarters: [
      { team: 19, opponent: 26 },
      { team: 22, opponent: 21 },
      { team: 17, opponent: 20 },
      { team: 24, opponent: 19 },
    ],
    scored: 82,
    conceded: 86,
    note: 'Проиграли стартовую четверть — отыграть не хватило времени',
  },
  {
    id: 'g-03',
    date: '2026-09-20T18:00:00+03:00',
    opponent: '«Атлант»',
    venue: 'home',
    arena: arena.name,
    competition: 'Регулярный сезон',
    quarters: [
      { team: 26, opponent: 18 },
      { team: 25, opponent: 23 },
      { team: 23, opponent: 24 },
      { team: 22, opponent: 21 },
    ],
    scored: 96,
    conceded: 86,
    note: 'Исаев оформил дабл-дабл: 19 очков и 14 подборов',
  },
  {
    id: 'g-04',
    date: '2026-09-27T19:30:00+03:00',
    opponent: '«Рикошет»',
    venue: 'away',
    arena: 'СК «Тула-Арена»',
    competition: 'Регулярный сезон',
    quarters: [
      { team: 21, opponent: 23 },
      { team: 20, opponent: 18 },
      { team: 19, opponent: 22 },
      { team: 25, opponent: 20 },
    ],
    scored: 85,
    conceded: 83,
    note: 'Волков забил решающий штрафной за 4 секунды до сирены',
  },
  {
    id: 'g-05',
    date: '2026-10-04T18:30:00+03:00',
    opponent: '«Сокол»',
    venue: 'away',
    arena: 'Дворец спорта «Крылья»',
    competition: 'Регулярный сезон',
  },
  {
    id: 'g-06',
    date: '2026-10-11T18:00:00+03:00',
    opponent: '«Заря»',
    venue: 'home',
    arena: arena.name,
    competition: 'Регулярный сезон',
  },
  {
    id: 'g-07',
    date: '2026-10-18T19:00:00+03:00',
    opponent: '«Форвард»',
    venue: 'away',
    arena: 'СК «Олимпийский»',
    competition: 'Кубок лиги',
  },
  {
    id: 'g-08',
    date: '2026-10-25T18:00:00+03:00',
    opponent: '«Динамо-Б»',
    venue: 'home',
    arena: arena.name,
    competition: 'Регулярный сезон',
  },
  {
    id: 'g-09',
    date: '2026-11-01T17:30:00+03:00',
    opponent: '«Каспий»',
    venue: 'home',
    arena: arena.name,
    competition: 'Регулярный сезон',
  },
  {
    id: 'g-10',
    date: '2026-11-08T19:00:00+03:00',
    opponent: '«Атлант»',
    venue: 'away',
    arena: 'КСК «Атлант»',
    competition: 'Регулярный сезон',
  },
  {
    id: 'g-11',
    date: '2026-11-15T18:00:00+03:00',
    opponent: '«Рикошет»',
    venue: 'home',
    arena: arena.name,
    competition: 'Регулярный сезон',
  },
];

/** Турнирная таблица дивизиона А на текущий момент. */
export const standings: StandingRow[] = [
  { rank: 1, team: '«Атлант»', games: 6, wins: 5, losses: 1, pointsFor: 512, pointsAgainst: 470 },
  { rank: 2, team: '«Меридиан»', games: 6, wins: 4, losses: 2, pointsFor: 528, pointsAgainst: 501, isUs: true },
  { rank: 3, team: '«Динамо-Б»', games: 6, wins: 4, losses: 2, pointsFor: 495, pointsAgainst: 489 },
  { rank: 4, team: '«Сокол»', games: 6, wins: 3, losses: 3, pointsFor: 486, pointsAgainst: 492 },
  { rank: 5, team: '«Рикошет»', games: 6, wins: 3, losses: 3, pointsFor: 478, pointsAgainst: 480 },
  { rank: 6, team: '«Заря»', games: 6, wins: 2, losses: 4, pointsFor: 464, pointsAgainst: 495 },
  { rank: 7, team: '«Каспий»', games: 6, wins: 2, losses: 4, pointsFor: 451, pointsAgainst: 486 },
  { rank: 8, team: '«Форвард»', games: 6, wins: 1, losses: 5, pointsFor: 440, pointsAgainst: 511 },
];

/**
 * Кадры с матчей для галереи моментов на главной.
 * Фотографии лежат в public/фотоматериалы (перенесены из папки фотоматериалов стоматологии).
 * Чтобы поставить другие снимки, замените файлы, сохранив имена.
 */
export const matchPhotos: MatchPhoto[] = [
  {
    id: 'm-01',
    file: 'фотоматериалы/istockphoto-1347653184-612x612.jpg',
    base: 'фотоматериалы/istockphoto-1347653184-612x612',
    tag: 'Регулярный сезон',
    caption: 'Играем первым номером: 96:86 с «Атлантом» дома',
  },
  {
    id: 'm-02',
    file: 'фотоматериалы/istockphoto-1567099949-612x612.jpg',
    base: 'фотоматериалы/istockphoto-1567099949-612x612',
    tag: 'Третья четверть',
    caption: 'Рывок 12:0 и перелом в игре с «Соколом»',
  },
  {
    id: 'm-03',
    file: 'фотоматериалы/istockphoto-2121353141-612x612.jpg',
    base: 'фотоматериалы/istockphoto-2121353141-612x612',
    tag: 'Победный бросок',
    caption: 'Волков выводит команду вперёд за 4 секунды до сирены',
  },
  {
    id: 'm-04',
    file: 'фотоматериалы/istockphoto-915349476-612x612.jpg',
    base: 'фотоматериалы/istockphoto-915349476-612x612',
    tag: 'Под щитом',
    caption: 'Исаев берёт 14 подборов — лучший матч сезона',
  },
];

export const news: NewsItem[] = [
  {
    id: 'n-01',
    date: '2026-09-28T10:00:00+03:00',
    title: 'Выездная победа в Туле — 85:83',
    excerpt:
      'Волков забил решающий штрафной за четыре секунды до сирены, а Исаев снова стал лучшим на щитах. Команда поднялась на второе место в дивизионе.',
    tag: 'Матч',
  },
  {
    id: 'n-02',
    date: '2026-09-22T12:00:00+03:00',
    title: 'Академия клуба объявила набор на сезон 2026/27',
    excerpt:
      'Три возрастные группы для игроков 2011–2016 годов рождения. Просмотры проходят по субботам в спорткомплексе «Меридиан», запись открыта.',
    tag: 'Клуб',
  },
  {
    id: 'n-03',
    date: '2026-09-21T09:30:00+03:00',
    title: 'Тимур Курбанов продлил контракт с клубом',
    excerpt:
      'Разыгрывающий, выпускник академии «Меридиан», остаётся в команде до конца сезона 2027/28. В прошлом сезоне он отдавал 4,3 передачи за матч.',
    tag: 'Трансфер',
  },
  {
    id: 'n-04',
    date: '2026-09-15T15:00:00+03:00',
    title: 'Открыта продажа абонементов на домашние матчи',
    excerpt:
      'Абонемент включает девять домашних игр регулярного сезона, место в секторе B и клубный шарф. Студентам и школьникам — половина стоимости.',
    tag: 'Клуб',
  },
];

export const partners: Partner[] = [
  { id: 'p-01', name: 'Спорткомплекс «Меридиан»', kind: 'Домашняя арена', site: 'https://meridian-bc.ru' },
  { id: 'p-02', name: 'Первый Мебельный', kind: 'Генеральный партнёр' },
  { id: 'p-03', name: 'Клиника «Основа»', kind: 'Медицинское сопровождение' },
  { id: 'p-04', name: 'Спортпит «Вектор»', kind: 'Питание и восстановление' },
];

/** Разделы навигации: используются шапкой и подвалом сайта. */
export const navLinks = [
  { href: '#moments', label: 'Моменты' },
  { href: '#team', label: 'Команда' },
  { href: '#schedule', label: 'Календарь' },
  { href: '#standings', label: 'Таблица' },
  { href: '#news', label: 'Новости' },
  { href: '#club', label: 'Клуб' },
];