import { Car } from '@/app/lib/api';
import CarItem from '../CarItem/CarItem';

type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  return (
    <ul>
      {cars.map((car) => (
        <CarItem key={car.id} item={car} />
      ))}
    </ul>
  );
}
