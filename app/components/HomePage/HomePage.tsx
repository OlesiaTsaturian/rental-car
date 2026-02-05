'use client';

import css from './HomePage.module.css';

export default function HomePage() {
  const handleSubmit = () => {};

  return (
    <div className={css.bgImageWrapper}>
      <div className={css.container}>
        <h1 className={css.mainTitle}>Find your perfect rental car</h1>
        <p className={css.mainText}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button type="submit" className={css.mainBtn} onClick={handleSubmit}>
          View Catalog
        </button>
      </div>
    </div>
  );
}
