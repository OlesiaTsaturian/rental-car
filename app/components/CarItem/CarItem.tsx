import { Car } from '@/app/types/car';
import css from './CarItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '../FavoriteBtn/FavoriteBtn';

type Props = {
  item: Car;
};

type Address = {
  city: string;
  country: string;
};

export function parseAddress(addressStr: string): Address | null {
  const parts = addressStr
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length < 3) return null;

  const country = parts.at(-1)!;
  const city = parts.at(-2)!;

  return { city, country };
}

export default function CarItem({ item }: Props) {
  const parsed = parseAddress(item.address);

  const city = parsed?.city ?? '—';
  const country = parsed?.country ?? '—';

  return (
    <li className={css.container}>
      <div className={css.imageBox}>
        <FavoriteButton carId={item.id} />
        <Image
          src={item.img}
          alt={item.model}
          width={276}
          height={268}
          className={css.image}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={css.titleContainer}>
        <h2 className={css.title}>
          {item.brand} <span className={css.accent}>{item.model}</span>,{' '}
          {item.year}
        </h2>
        <h2 className={css.title}>${item.rentalPrice}</h2>
      </div>
      <p className={css.paragrapf}>
        <span className={css.span}>{city} </span>
        <span className={css.span}>{country}</span>
        <span className={css.span}>{item.rentalCompany}</span>
      </p>
      <p className={css.paragrapf}>
        <span className={css.span}> {item.type} </span>
        <span className={css.span}>{item.mileage} km</span>
      </p>

      <Link href={`/cars/${item.id}`} className={css.readMoreBtn}>
        Read more
      </Link>
    </li>
  );
}
