'use client';

import BookCarForm from '@/app/components/BookCar/BookCar';
import { getCarInfo } from '@/app/lib/clientApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function CarDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarInfo(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !car) return <p>Some error..</p>;

  return (
    <div>
      <div>
        <Image src={car.img} alt={car.brand} width={640} height={512} />

        <BookCarForm />
      </div>
      <div>
        <div>
          <svg width={11} height={15}>
            <use href="/sprite.svg/#location"></use>
          </svg>
          <h3>
            {car.brand}, {car.year} <span>Id: {car.id}</span>
          </h3>
          <p>${car.rentalPrice}</p>
          <p>{car.description}</p>
        </div>
        <div>
          <h4>Rental Conditions: </h4>
          <ul>
            {car.rentalConditions.slice(0, 3).map((cond, i) => (
              <li key={i}>
                <svg width={11} height={15} aria-hidden="true">
                  <use
                    href="/sprite.svg#check-circle"
                    xlinkHref="/sprite.svg#check-circle"
                  />
                </svg>
                <span>{cond}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Car Specifications:</h4>
          <ul>
            <li>
              <svg width={16} height={16}>
                <use href="/sprite.svg#calendar"></use>
              </svg>
              Year: {car.year}
            </li>
            <li>
              <svg width={16} height={16}>
                <use href="/sprite.svg#car"></use>
              </svg>
              Type: {car.type}
            </li>
            <li>
              <svg width={16} height={16}>
                <use href="/sprite.svg#fuel-pump"></use>
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li>
              <svg width={16} height={16}>
                <use href="/sprite.svg#gear"></use>
              </svg>
              Engine Size: {car.engineSize}
            </li>
          </ul>
        </div>
        <div>
          <h4>Accessories and functionalities:</h4>
          <ul>
            {car.accessories.map((cond, i) => (
              <li key={i}>
                <svg width={11} height={15} aria-hidden="true">
                  <use
                    href="/sprite.svg#check-circle"
                    xlinkHref="/sprite.svg#check-circle"
                  />
                </svg>
                <span>{cond}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
