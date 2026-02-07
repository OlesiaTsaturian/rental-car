'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import CarList from '../components/CarList/CarList';
import { fetchCarsPage } from '../lib/clientApi';
import css from './catalog.module.css';
import { useState } from 'react';
import { FilterValues } from '../types/car';
import CarsFilter from '../components/CarsFilter/CarsFilter';

const LIMIT = 12;

export default function CatalogClient() {
  // null => ще не робили пошук => показуємо тільки фільтр
  const [filters, setFilters] = useState<FilterValues | null>(null);

  const query = useInfiniteQuery({
    queryKey: ['cars', { limit: LIMIT, ...(filters ?? {}) }],
    initialPageParam: 1,
    enabled: filters !== null,
    queryFn: ({ pageParam }) =>
      fetchCarsPage({
        page: pageParam,
        limit: LIMIT,
        ...(filters ?? {}),
      }),
    getNextPageParam: (lastPage) => {
      const current = Number(lastPage.page);
      return current < lastPage.totalPages ? current + 1 : undefined;
    },
  });

  const cars = query.data?.pages.flatMap((p) => p.cars) ?? [];

  return (
    <>
      <CarsFilter
        onApply={(applied) => setFilters(applied)}
        onReset={() => setFilters(null)}
      />

      {filters === null ? null : (
        <>
          {query.status === 'pending' && <p>Loading...</p>}
          {query.status === 'error' && <p>Something went wrong</p>}

          {cars.length > 0 && <CarList cars={cars} />}

          <button
            type="button"
            onClick={() => query.fetchNextPage()}
            disabled={!query.hasNextPage || query.isFetchingNextPage}
          >
            {query.isFetchingNextPage
              ? 'Loading...'
              : query.hasNextPage
                ? 'Load more'
                : 'No more'}
          </button>
        </>
      )}
    </>
  );
}
