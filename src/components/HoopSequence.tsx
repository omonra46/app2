import type { CSSProperties } from 'react';

import { HoopVideo } from '@/components/HoopVideo';
import { Reveal } from '@/components/Reveal';
import { matchPhotos } from '@/data/team';
import { publicUrl } from '@/lib/assets';

import '@/components/HoopSequence.css';

/** Разброс порогов появления кадров: каждый следующий чуть позже. */
const CARD_STEP = 0.07;

/**
 * Галерея моментов, которую открывает видеосцена броска (HoopVideo):
 * при прокрутке на тёмном градиенте проигрывается реальное видео
 * попадания мяча в кольцо, затем сцена растворяется и открывается
 * сетка кадров с матчей. Прокрутка вверх проигрывает всё в обратном
 * порядке.
 */
export function HoopSequence() {
  return (
    <HoopVideo>
      <Reveal>
        <p className="eyebrow text-center">Моменты сезона</p>
        <h2 className="font-display moments-title mt-2 text-center text-2xl uppercase sm:text-3xl">
          Кадры с матчей
        </h2>
      </Reveal>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {matchPhotos.map((photo, index) => (
          <figure
            key={photo.id}
            className="moment relative overflow-hidden rounded-lg border border-[var(--line)] bg-card"
            style={{ '--t': (index * CARD_STEP).toFixed(2) } as CSSProperties}
          >
            <picture>
              <source
                type="image/avif"
                srcSet={`${publicUrl(`${photo.base}-400.avif`)} 400w, ${publicUrl(`${photo.base}-800.avif`)} 800w, ${publicUrl(`${photo.base}.avif`)} 612w`}
                sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 50vw"
              />
              <source
                type="image/webp"
                srcSet={`${publicUrl(`${photo.base}.webp`)} 612w`}
                sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 50vw"
              />
              <img
                src={publicUrl(photo.file)}
                alt={photo.caption}
                width={612}
                height={408}
                className="aspect-[3/2] w-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </picture>
            {/* Подпись лежит поверх кадра — карточки остаются низкими
                и весь блок помещается в закреплённую сцену */}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-3">
              <p className="eyebrow">{photo.tag}</p>
              <p className="mt-1 text-xs leading-snug text-white/90">{photo.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </HoopVideo>
  );
}