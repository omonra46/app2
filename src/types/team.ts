/** Позиция игрока на площадке (общепринятые обозначения). */
export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

/** Игрок основной заявки клуба. */
export type Player = {
  /** Стабильный идентификатор для ссылок и ключей списка */
  id: string;
  /** Игровой номер */
  number: number;
  /** Имя и фамилия */
  name: string;
  position: Position;
  /** Позиция словами: «разучивающий», «центровой» и т. д. */
  positionLabel: string;
  /** Рост в сантиметрах */
  height: number;
  /** Год рождения */
  born: number;
  /** Команда или город, откуда игрок пришёл */
  from: string;
  /** Средние очки за матч */
  ppg: number;
  /** Средние подборы за матч */
  rpg: number;
  /** Средние передачи за матч */
  apg: number;
  /** Реализация бросков, проценты */
  fg: number;
  /** Реализация штрафных, проценты */
  ft: number;
};

/** Член тренерского штаба. */
export type Coach = {
  id: string;
  name: string;
  role: string;
  /** Стаж или заметка о специализации */
  note: string;
};

/** Матч регулярного сезона. */
export type Game = {
  id: string;
  /** Дата и время начала в ISO-формате */
  date: string;
  /** Соперник */
  opponent: string;
  /** 'home' — на своей площадке, 'away' — в гостях */
  venue: 'home' | 'away';
  /** Название арены */
  arena: string;
  /** Турнир, в рамках которого играется матч */
  competition: string;
  /** Счёт по четвертям: свои / соперника. Пусто у будущих матчей. */
  quarters?: Array<{ team: number; opponent: number }>;
  /** Очки нашей команды. Пусто у будущих матчей. */
  scored?: number;
  /** Очки соперника. Пусто у будущих матчей. */
  conceded?: number;
  /** Отдельные события матча — заполняется по мере появления материалов */
  note?: string;
};

/** Строка турнирной таблицы. */
export type StandingRow = {
  /** Место в таблице */
  rank: number;
  team: string;
  games: number;
  wins: number;
  losses: number;
  /** Заброшенные и пропущенные очки */
  pointsFor: number;
  pointsAgainst: number;
  /** Клуб выделяется в таблице цветом */
  isUs?: boolean;
};

/** Новость или материал клуба. */
export type NewsItem = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  /** Короткая метка: «Матч», «Клуб», «Трансфер» */
  tag: string;
  /** Адрес страницы материала. Появится, когда будет готова новостная часть. */
  href?: string;
};

/** Партнёр или спонсор клуба. */
export type Partner = {
  id: string;
  name: string;
  /** Направление сотрудничества */
  kind: string;
  site?: string;
};

/** Кадр с матча для галереи моментов. */
export type MatchPhoto = {
  id: string;
  /** Путь к файлу внутри public/, например 'фотоматериалы/istockphoto-1347653184-612x612.jpg' */
  file: string;
  /**
   * Базовое имя файла без расширения и суффикса ширины
   * (например 'фотоматериалы/istockphoto-1347653184-612x612') — для srcset вариантов AVIF/WebP.
   */
  base: string;
  /** Подпись к кадру */
  caption: string;
  /** Метка матча или турнира */
  tag: string;
};

/** Домашняя арена команды. */
export type Arena = {
  name: string;
  address: string;
  capacity: number;
  /** Как добраться */
  travel: string;
  ticketUrl?: string;
};

/** Реквизиты и контакты клуба. */
export type Club = {
  name: string;
  shortName: string;
  city: string;
  founded: number;
  league: string;
  slogan: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  headquarters: string;
  telegram: string;
  vk: string;
  youtube: string;
};