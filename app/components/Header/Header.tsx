import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <div className={css.container}>
      <div>
        <Link href="/">
          <svg width="104" height="26">
            <use href="/logo.svg"></use>
          </svg>
        </Link>
      </div>
      <ul className={css.list}>
        <li className={css.listItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={css.listItem}>
          <Link href="/catalog">Catalog</Link>
        </li>
      </ul>
    </div>
  );
}
