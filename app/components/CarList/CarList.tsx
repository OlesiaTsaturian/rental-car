import { Car } from '@/app/lib/api';
import CarItem from '../CarItem/CarItem';
import css from './CarList.module.css';

type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  return (
    <ul className={css.listContainer}>
      {cars.map((car) => (
        <CarItem key={car.id} item={car} />
      ))}
    </ul>
  );
}
