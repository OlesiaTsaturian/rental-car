'use client';
import css from './CarDetails.module.css';
import BookCarForm from '@/app/components/BookCar/BookCar';
import { getCarInfo } from '@/app/lib/clientApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { parseAddress } from '@/app/components/CarItem/CarItem';

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

  const parsed = parseAddress(car.address);
  const city = parsed?.city ?? '—';
  const country = parsed?.country ?? '—';

  return (
    <div className={css.container}>
      <div className={css.part}>
        <Image
          src={car.img}
          alt={car.brand}
          width={640}
          height={512}
          className={css.descImg}
        />

        <BookCarForm />
      </div>

      <div className={css.partInfo}>
        <div className={css.carInfoPart}>
          <h3 className={css.carInfoHeader}>
            {car.brand}, {car.year}
            <span className={css.carInfoId}>
              Id: {car.id?.slice(0, 4) ?? ''}
            </span>
          </h3>
          <div className={css.locationWrap}>
            <p className={css.textForAll}>
              <svg width={16} height={16} className={css.svgAll}>
                <use href="/sprite.svg/#location"></use>
              </svg>
              {city}, {country}
            </p>
            <p className={css.textForAll}>
              Mileage: {car.mileage.toLocaleString('uk-UA')} km
            </p>
          </div>
          <p className={css.accent}>${car.rentalPrice}</p>
          <p className={css.textForAll}>{car.description}</p>
        </div>

        <div className={css.rentCarDetails}>
          <h4 className={css.benefitsText}>Rental Conditions: </h4>
          <ul>
            {car.rentalConditions.slice(0, 3).map((cond, i) => (
              <li key={i} className={css.benefitsDesc}>
                <svg
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className={css.svgAll}
                >
                  <use href="/sprite.svg#check-circle" />
                </svg>
                <span>{cond}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.rentCarDetails}>
          <h4 className={css.benefitsText}>Car Specifications:</h4>
          <ul>
            <li className={css.benefitsDesc}>
              <svg width={16} height={16} className={css.svgAll}>
                <use href="/sprite.svg#calendar"></use>
              </svg>
              Year: {car.year}
            </li>
            <li className={css.benefitsDesc}>
              <svg width={16} height={16} className={css.svgAll}>
                <use href="/sprite.svg#car"></use>
              </svg>
              Type: {car.type}
            </li>
            <li className={css.benefitsDesc}>
              <svg width={16} height={16} className={css.svgAll}>
                <use href="/sprite.svg#fuel-pump"></use>
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className={css.benefitsDesc}>
              <svg width={16} height={16} className={css.svgAll}>
                <use href="/sprite.svg#gear"></use>
              </svg>
              Engine Size: {car.engineSize}
            </li>
          </ul>
        </div>

        <div className={css.rentCarDetails}>
          <h4 className={css.benefitsText}>Accessories and functionalities:</h4>
          <ul>
            {car.accessories.map((cond, i) => (
              <li key={i} className={css.benefitsDesc}>
                <svg
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className={css.svgAll}
                >
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
