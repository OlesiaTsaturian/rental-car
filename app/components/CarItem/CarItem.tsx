import { Car } from '@/app/lib/api';
import css from './CarItem.module.css';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  item: Car;
};

type Address = {
  city: string;
  country: string;
};

function parseAddress(addressStr: string): Address | null {
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

  const km = Math.round(item.mileage * 1.609344);
  return (
    <li className={css.container}>
      <Image
        src={item.img}
        alt={item.model}
        width={276}
        height={268}
        className={css.imageWrapper}
        style={{ objectFit: 'cover' }}
      />
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
        <span className={css.span}>{km} km</span>
      </p>

      <Link href={`/cars/${item.id}`} className={css.readMoreBtn}>
        Read more
      </Link>
    </li>
  );
}
