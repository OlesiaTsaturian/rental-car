'use client';

import { MouseEvent } from 'react';
import { useFavoritesStore } from '@/app/store/useFavoritesStore';
import css from './FavoriteBtn.module.css';

export default function FavoriteButton({ carId }: { carId: string }) {
  const isFav = useFavoritesStore((s) => s.has(carId));
  const toggle = useFavoritesStore((s) => s.toggle);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(carId);
  };

  return (
    <button
      type="button"
      className={css.btn}
      onClick={onClick}
      aria-label="Add to favorites"
    >
      <svg width={18} height={18} aria-hidden="true">
        <use href={`${isFav ? '/active.svg' : '/default.svg'}`} />
      </svg>
    </button>
  );
}
