import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HoopSequence } from '@/components/HoopSequence';
import { Reveal } from '@/components/Reveal';
import { SiteHeader } from '@/components/SiteHeader';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { arena, club, coaches, games, news, partners, players, standings } from '@/data/team';
import {
  averageAge,
  averageHeight,
  formatDateLong,
  formatDateShort,
  formatTime,
  isPlayed,
  isWin,
  lastGame,
  nextGame,
  resultLabel,
  seasonRecord,
  statLeaders,
  venueLabel,
} from '@/lib/team';

export function Home() {
  const record = seasonRecord(games);
  const upcoming = nextGame(games);
  const leaders = statLeaders(players);
  const previous = lastGame(games);

  return (
    <div id="top" className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-10 xl:max-w-7xl">
        <header className="border-b border-[var(--line)] pb-10">
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow">{club.league}</p>
            <ThemeToggle className="sm:hidden" />
          </div>

          {/* Гигантский вордмарк: задавая тон всей странице, он же — сцена для сцены броска */}
          <h1 className="font-display mt-6 text-[clamp(4.5rem,14vw,9rem)] font-medium uppercase leading-[0.88] tracking-[0.01em]">
            {club.shortName}
          </h1>
          <p className="mt-4 max-w-xl text-base text-[var(--ink-soft)] sm:text-lg">
            {club.slogan}. {club.city}, основан в {club.founded} году.
          </p>

          {/* Скорборд-полоса статистики сезона */}
          <dl className="mt-8 grid grid-cols-2 border-y border-[var(--line)] sm:grid-cols-4">
            {[
              { label: 'Матчей', value: record.games },
              { label: 'Побед', value: record.wins },
              { label: 'Поражений', value: record.losses },
              { label: 'Очки за матч', value: `${record.avgScored} : ${record.avgConceded}` },
            ].map((stat) => (
              <Stat key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </dl>

          {/* Результат последнего матча: нить к ближайшей афише */}
          {previous && isPlayed(previous) && (
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--ink-soft)]">
              <span>Последний матч:</span>
              <span className="text-[var(--ink)]">
                {club.shortName} — {previous.opponent}
              </span>
              <span className="tnum font-display text-base">
                {previous.scored}:{previous.conceded}
              </span>
              <Badge variant={isWin(previous) ? 'win' : 'loss'}>
                {resultLabel(previous)}
              </Badge>
              <span className="tnum">{formatDateShort(previous.date)}</span>
            </p>
          )}
        </header>

        {/* Ближайший матч — главный акцент страницы */}
        {upcoming && (
          <Reveal className="mt-10">
            <Card className="lift overflow-hidden">
              <CardHeader className="flex-row items-center justify-between gap-4">
                <p className="eyebrow">Ближайший матч</p>
                <Badge variant="soft">{upcoming.competition}</Badge>
              </CardHeader>
              <CardContent>
                <p className="font-display text-2xl uppercase sm:text-3xl">
                  {club.shortName} — {upcoming.opponent}
                </p>
                <p className="mt-3 text-sm text-[var(--ink-soft)]">
                  {formatDateLong(upcoming.date)} · {formatTime(upcoming.date)} ·{' '}
                  {venueLabel(upcoming)} · {upcoming.arena}
                </p>
                {upcoming.venue === 'home' && (
                  <div className="mt-5">
                    <Button asChild>
                      <a
                        href={arena.ticketUrl}
                        rel="noreferrer noopener"
                        target="_blank"
                        className="inline-flex min-h-[44px] items-center"
                      >
                        Купить билет
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Reveal>
        )}

        {/* Сцена броска: выезжает кольцо, в него влетает мяч, затем
            кольцо исчезает и открываются моменты с матчей */}
        <HoopSequence />

        {/* Заявка команды и тренерский штаб */}
        <section id="team" className="mt-16 scroll-mt-24">
          <Reveal>
            <SectionHeading number="01" title="Команда" />
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              {players.length} игроков в заявке · средний рост {averageHeight(players)} см ·
              средний возраст {averageAge(players)} лет
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <LeaderCard className="lift" title="Очки" player={leaders.scoring?.name} value={String(leaders.scoring?.ppg)} />
            <LeaderCard className="lift" title="Подборы" player={leaders.rebounding?.name} value={String(leaders.rebounding?.rpg)} />
            <LeaderCard className="lift" title="Передачи" player={leaders.assisting?.name} value={String(leaders.assisting?.apg)} />
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
              <caption className="sr-only">
                Заявка команды: номер, игрок, позиция, рост, очки, подборы, передачи за матч
              </caption>
              <thead>
                <tr className="border-b border-[var(--line)] text-left">
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">№</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">Игрок</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">Позиция</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">Рост</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">О</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">П</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">Пр</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id} className="border-b border-[var(--line)]">
                    <td className="tnum py-3 pr-4 text-[var(--court)]">{player.number}</td>
                    <td className="py-3 pr-4">{player.name}</td>
                    <td className="py-3 pr-4 text-[var(--ink-soft)]">{player.positionLabel}</td>
                    <td className="tnum py-3 pr-4 text-[var(--ink-soft)]">{player.height}</td>
                    <td className="tnum py-3 pr-4">{player.ppg}</td>
                    <td className="tnum py-3 pr-4">{player.rpg}</td>
                    <td className="tnum py-3 pr-4">{player.apg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {coaches.map((coach) => (
              <Card key={coach.id} className="lift">
                <CardHeader>
                  <CardTitle>{coach.name}</CardTitle>
                  <p className="text-sm text-[var(--court)]">{coach.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--ink-soft)]">{coach.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Календарь: сыгранные матчи и афиша */}
        <section id="schedule" className="mt-16 scroll-mt-24">
          <Reveal>
            <SectionHeading number="02" title="Календарь" />
          </Reveal>

          <ul className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {games.map((game) => (
              <li
                key={game.id}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 transition-colors hover:bg-[var(--paper-2)] sm:px-2"
              >
                <span className="tnum w-16 text-sm text-[var(--ink-soft)]">
                  {formatDateShort(game.date)}
                </span>
                <span className="tnum w-14 text-sm text-[var(--ink-soft)]">
                  {formatTime(game.date)}
                </span>
                <span className="min-w-[12rem] flex-1">
                  {club.shortName} — {game.opponent}
                </span>
                <span className="text-sm text-[var(--ink-soft)]">{venueLabel(game)}</span>

                {isPlayed(game) ? (
                  <span className="flex items-center gap-3">
                    <span className="tnum font-display text-xl">
                      {game.scored}:{game.conceded}
                    </span>
                    <Badge variant={isWin(game) ? 'win' : 'loss'}>{resultLabel(game)}</Badge>
                  </span>
                ) : (
                  <Badge variant="outline">Афиша</Badge>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Таблица дивизиона */}
        <section id="standings" className="mt-16 scroll-mt-24">
          <Reveal>
            <SectionHeading number="03" title="Таблица" />
          </Reveal>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">
                Турнирная таблица дивизиона: место, команда, игры, победы, поражения, разница очков
              </caption>
              <thead>
                <tr className="border-b border-[var(--line)] text-left">
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">#</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">Команда</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">И</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">В</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">П</th>
                  <th scope="col" className="py-3 pr-4 font-medium text-[var(--ink-soft)]">+/-</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {standings.map((row) => (
                  <tr
                    key={row.rank}
                    className={`border-b border-[var(--line)] transition-colors hover:bg-[var(--paper-2)] ${
                      row.isUs ? 'font-medium text-[var(--court)]' : ''
                    }`}
                  >
                    <td className="tnum py-3 pr-4">{row.rank}</td>
                    <td className="py-3 pr-4">{row.team}</td>
                    <td className="tnum py-3 pr-4">{row.games}</td>
                    <td className="tnum py-3 pr-4">{row.wins}</td>
                    <td className="tnum py-3 pr-4">{row.losses}</td>
                    <td className="tnum py-3 pr-4">
                      {row.pointsFor - row.pointsAgainst > 0 ? '+' : ''}
                      {row.pointsFor - row.pointsAgainst}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Новости клуба */}
        <section id="news" className="mt-16 scroll-mt-24">
          <Reveal>
            <SectionHeading number="04" title="Новости" />
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {news.map((item) => (
              <Card key={item.id} className="lift">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <span className="tnum text-xs text-[var(--ink-soft)]">
                      {formatDateShort(item.date)}
                    </span>
                    <Badge variant="soft">{item.tag}</Badge>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--ink-soft)]">{item.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Клуб: арена и контакты */}
        <section id="club" className="mt-16 scroll-mt-24">
          <Reveal>
            <SectionHeading number="05" title="Клуб" />
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              {club.league} · основан в {club.founded} году
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{arena.name}</CardTitle>
                <p className="text-sm text-[var(--court)]">{arena.capacity} мест</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm text-[var(--ink-soft)]">
                <p>{arena.address}</p>
                <p>{arena.travel}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Связаться с клубом</CardTitle>
                <p className="text-sm text-[var(--court)]">{club.city}</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm">
                <a
                  href={club.phoneHref}
                  className="inline-flex min-h-[44px] items-center text-[var(--ink-soft)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] hover:text-[var(--ink)]"
                >
                  {club.phoneDisplay}
                </a>
                <a
                  href={`mailto:${club.email}`}
                  className="inline-flex min-h-[44px] items-center text-[var(--ink-soft)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] hover:text-[var(--ink)]"
                >
                  {club.email}
                </a>
                <p className="text-[var(--ink-soft)]">{club.headquarters}</p>
              </CardContent>
            </Card>
          </div>

          {/* Партнёры клуба */}
          <Reveal className="mt-12">
            <h3 className="font-display text-lg uppercase tracking-wide">Партнёры</h3>
          </Reveal>
          <ul className="mt-6 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <li key={partner.id}>
                <Reveal delay={index * 60}>
                  <div className="flex h-full flex-col justify-between gap-6 bg-[var(--paper)] p-5 transition-colors hover:bg-[var(--paper-2)]">
                    <span className="tnum text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {partner.site ? (
                      <a
                        href={partner.site}
                        rel="noreferrer noopener"
                        className="font-display text-base uppercase tracking-wide text-[var(--ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] hover:text-[var(--court)]"
                      >
                        {partner.name}
                      </a>
                    ) : (
                      <p className="font-display text-base uppercase tracking-wide text-[var(--ink)]">
                        {partner.name}
                      </p>
                    )}
                    <p className="text-xs text-[var(--ink-soft)]">{partner.kind}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="site-safe-pad border-t border-[var(--line)] pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 xl:max-w-7xl">
          <p>
            © {new Date().getFullYear()} {club.name}
          </p>
          <div className="flex gap-5">
            <a
              href={club.telegram}
              className="inline-flex min-h-[44px] items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] hover:text-[var(--ink)]"
              rel="noreferrer noopener"
            >
              Telegram
            </a>
            <a
              href={club.vk}
              className="inline-flex min-h-[44px] items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] hover:text-[var(--ink)]"
              rel="noreferrer noopener"
            >
              ВКонтакте
            </a>
            <a
              href={club.youtube}
              className="inline-flex min-h-[44px] items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--court)] hover:text-[var(--ink)]"
              rel="noreferrer noopener"
            >
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/** Редакционный заголовок секции: номер, тире, название, линейка. */
function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="tnum eyebrow text-base sm:text-lg">{number}</span>
      <h2 className="font-display text-2xl uppercase leading-none sm:text-3xl">{title}</h2>
      <span
        aria-hidden="true"
        className="ml-2 hidden h-px flex-1 self-center bg-[var(--line)] sm:block"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-[var(--line)] border-b px-1 py-4 last:border-b-0 sm:border-r sm:border-b-0 sm:px-4 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
      <dt className="text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">{label}</dt>
      <dd className="tnum font-display mt-1 text-3xl">{value}</dd>
    </div>
  );
}

function LeaderCard({
  className,
  title,
  player,
  value,
}: {
  className?: string;
  title: string;
  player?: string;
  value: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <p className="eyebrow">{title}</p>
        <CardTitle>{player ?? '—'}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="tnum font-display text-2xl text-[var(--court)]">{value}</p>
      </CardContent>
    </Card>
  );
}