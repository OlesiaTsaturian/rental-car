import { Car } from '@/app/lib/api';
import css from './CarItem.module.css';
import Image from 'next/image';

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
      <Image src={item.img} alt={item.model} width={276} height={268} />
      <div>
        <h2>
          {item.brand} <span>{item.model}</span>, {item.year}
        </h2>
        <h2>${item.rentalPrice}</h2>
      </div>
      <p>
        {city} | {country} | {item.rentalCompany}
      </p>
      <p>
        {item.type} | {km} km
      </p>
    </li>
  );
}
