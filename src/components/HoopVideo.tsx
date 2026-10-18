import { useEffect, useRef, type ReactNode } from 'react';

import { publicUrl } from '@/lib/assets';
import { useScrollProgress } from '@/hooks/useScrollProgress';

import '@/components/HoopVideo.css';

/** Доля прокрутки сцены, за которую проигрывается весь бросок. */
const SHOT_SPAN = 0.5;
/** Скорость подтяжки видео к цели: больше — отзывчивее, меньше — плавнее. */
const SMOOTHING = 5;
/** Seek не чаще ~32 раз в секунду: чаще кадров самого видео всё равно нет. */
const SEEK_INTERVAL = 1000 / 32;
/** Минимальный шаг времени, ради которого стоит делать seek. */
const SEEK_EPSILON = 1 / 50;
/** Если событие seeked не пришло за это время — считаем seek завершенным. */
const SEEK_TIMEOUT = 300;

/**
 * Видеосцена броска: реальная съёмка попадания мяча в кольцо (Mixkit),
 * вписанная в тёмный градиент. Прогресс прокрутки скраббит видео:
 * скролл вниз проигрывает бросок, скролл вверх отматывает его назад.
 *
 * Скраб инерционный: позиция скролла задаёт цель, а rAF-цикл плавно
 * тянет время видео к ней — скачки колеса мыши и шаги тачпада
 * превращаются в ровное воспроизведение. Seek'и координируются
 * событием seeked и ограничены по частоте, чтобы декодер не захлёбывался.
 *
 * На «уменьшении движения» видео не монтируется — сразу открывается
 * галерея моментов (children).
 */
export function HoopVideo({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrubRef = useRef<((p: number) => void) | null>(null);

  const { ref: sectionRef, reduced } = useScrollProgress<HTMLElement>((p) => {
    scrubRef.current?.(p);
  });

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reduced) {
      scrubRef.current = null;
      return;
    }

    let raf = 0;
    let last = 0;
    /* Время видео в нормализованном виде: цель и текущее значение, 0..1 */
    let target = 0;
    let current = -1;
    let seekPending = false;
    let lastSeekAt = 0;
    let settleUntil = 0;

    const frame = (now: number) => {
      raf = 0;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      /* Первый заход — стартуем точно с цели, без разгона из нуля */
      if (current < 0) current = target;

      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;

      /* Экспоненциальное сглаживание: не зависит от частоты кадров */
      const diff = target - current;
      if (Math.abs(diff) > 1e-3) {
        current += diff * (1 - Math.exp(-SMOOTHING * dt));
      } else {
        current = target;
      }

      /* Страховка: seek считается завершённым даже без события seeked */
      if (seekPending && now - lastSeekAt > SEEK_TIMEOUT) seekPending = false;

      const t = Math.min(Math.max(current, 0), 1) * Math.max(duration - 0.05, 0);

      if (
        !seekPending &&
        now - lastSeekAt >= SEEK_INTERVAL &&
        Math.abs(video.currentTime - t) > SEEK_EPSILON
      ) {
        seekPending = true;
        lastSeekAt = now;
        video.currentTime = t;
      }

      /* Цикл живёт, пока видео догоняет цель, и гаснет через паузу после */
      const settled = Math.abs(target - current) < 1e-3 && !seekPending;
      if (settled && now > settleUntil) {
        last = 0;
        return;
      }
      raf = window.requestAnimationFrame(frame);
    };

    const scrub = (p: number) => {
      /* Бросок проигрывается на первой половине прогресса, дальше кадр
         держится на попадании — финал остаётся на экране */
      target = Math.min(Math.max(p, 0), SHOT_SPAN) / SHOT_SPAN;
      settleUntil = performance.now() + 300;
      if (!raf) raf = window.requestAnimationFrame(frame);
    };

    scrubRef.current = scrub;

    /* Seek завершён — разрешаем следующий */
    const onSeeked = () => {
      seekPending = false;
    };
    video.addEventListener('seeked', onSeeked);

    /* Первый кадр: прогресс уже посчитан хуком, синхронизируемся с ним */
    const onLoaded = () => {
      const p = Number(section.style.getPropertyValue('--p'));
      scrub(Number.isFinite(p) ? p : 0);
    };
    video.addEventListener('loadedmetadata', onLoaded);
    if (video.readyState >= 1) onLoaded();

    return () => {
      scrubRef.current = null;
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onLoaded);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduced, sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="moments"
      className={`hoop-sequence${reduced ? ' is-static' : ''}`}
      aria-label="Моменты с матчей"
    >
      <div className="hoop-stage">
        {/* Градиентная вуаль: постоянный тёмный фон сцены */}
        <div className="hoop-veil" aria-hidden="true" />

        {!reduced && (
          <video
            ref={videoRef}
            className="hoop-video"
            src={publicUrl('videos/hoop-shot.mp4')}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
          />
        )}

        <div className="moments">{children}</div>
      </div>
    </section>
  );
}