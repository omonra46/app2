import { games, players } from '@/data/team';
import type { Game, Player } from '@/types/team';

const MONTHS_SHORT = [
  'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
];

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const WEEKDAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

/** Матч состоялся: есть итоговый счёт. */
export function isPlayed(game: Game): boolean {
  return typeof game.scored === 'number' && typeof game.conceded === 'number';
}

/** Победа нашей команды в матче. */
export function isWin(game: Game): boolean {
  return isPlayed(game) && (game.scored as number) > (game.conceded as number);
}

/** Сыгранные матчи в хронологическом порядке. */
export function playedGames(list: Game[] = games): Game[] {
  return list
    .filter(isPlayed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/** Предстоящие матчи в хронологическом порядке. */
export function upcomingGames(list: Game[] = games): Game[] {
  return list.filter((game) => !isPlayed(game)).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

/** Ближайший матч или undefined, если календарь исчерпан. */
export function nextGame(list: Game[] = games): Game | undefined {
  return upcomingGames(list)[0];
}

/** Последний сыгранный матч. */
export function lastGame(list: Game[] = games): Game | undefined {
  const played = playedGames(list);
  return played[played.length - 1];
}

/** Итог сезона по сыгранным матчам. */
export function seasonRecord(list: Game[] = games) {
  const played = playedGames(list);
  const wins = played.filter(isWin).length;
  return {
    games: played.length,
    wins,
    losses: played.length - wins,
    /** Средние очки: свои и соперника */
    avgScored: played.length
      ? Math.round((played.reduce((sum, g) => sum + (g.scored as number), 0) / played.length) * 10) / 10
      : 0,
    avgConceded: played.length
      ? Math.round((played.reduce((sum, g) => sum + (g.conceded as number), 0) / played.length) * 10) / 10
      : 0,
  };
}

/** Дата коротко: «27 сен». */
export function formatDateShort(iso: string): string {
  const date = new Date(iso);
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

/** Дата полностью: «27 сентября, вс». */
export function formatDateLong(iso: string): string {
  const date = new Date(iso);
  return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]}, ${WEEKDAYS[date.getDay()]}`;
}

/** Время начала матча: «19:30». */
export function formatTime(iso: string): string {
  const date = new Date(iso);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/** Метка места: «Дома» или «В гостях». */
export function venueLabel(game: Game): string {
  return game.venue === 'home' ? 'Дома' : 'В гостях';
}

/** Итог матча одним словом: «Победа» / «Поражение». */
export function resultLabel(game: Game): string {
  return isWin(game) ? 'Победа' : 'Поражение';
}

/** Средний рост состава в сантиметрах. */
export function averageHeight(list: Player[]): number {
  if (!list.length) return 0;
  return Math.round(list.reduce((sum, p) => sum + p.height, 0) / list.length);
}

/** Средний возраст состава на текущий год. */
export function averageAge(list: Player[]): number {
  if (!list.length) return 0;
  const year = new Date().getFullYear();
  return Math.round(list.reduce((sum, p) => sum + (year - p.born), 0) / list.length);
}

/** Лидеры состава по очкам, подборам и передачам. */
export function statLeaders(list: Player[] = players) {
  const byPpg = [...list].sort((a, b) => b.ppg - a.ppg);
  const byRpg = [...list].sort((a, b) => b.rpg - a.rpg);
  const byApg = [...list].sort((a, b) => b.apg - a.apg);
  return {
    scoring: byPpg[0],
    rebounding: byRpg[0],
    assisting: byApg[0],
  };
}