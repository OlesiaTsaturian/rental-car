'use client';
import css from './CarsFilter.module.css';
import { getBrand } from '@/app/lib/clientApi';
import { FilterValues } from '@/app/types/car';
import { useQuery } from '@tanstack/react-query';
import { Field, Form, Formik, FormikHelpers } from 'formik';

const initialValues: FilterValues = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

function normalize(value: FilterValues): FilterValues {
  return {
    brand: value.brand || undefined,
    rentalPrice: value.rentalPrice || undefined,
    minMileage: value.minMileage || undefined,
    maxMileage: value.maxMileage || undefined,
  };
}

export default function CarsFilter({
  onApply,
}: {
  onApply: (filters: FilterValues) => void;
  onReset: () => void;
}) {
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrand,
    staleTime: 60 * 60 * 1000,
  });

  const handleSubmit = (
    values: FilterValues,
    actions: FormikHelpers<FilterValues>,
  ) => {
    onApply(normalize(values));
    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.searchContainer}>
        <div className={css.selectWrap}>
          <p className={css.descriptionText}> Car brand</p>
          <Field as="select" name="brand" className={css.input}>
            <option value="">Choose a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Field>
        </div>
        <div className={css.selectWrap}>
          <p className={`${css.descriptionText} ${css.inputPrice}`}>
            Price/ 1 hour
          </p>
          <div className={css.priceWrap}>
            <Field as="select" name="rentalPrice" className={css.input}>
              <option value="">Choose a price</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
            </Field>{' '}
          </div>
        </div>
        <div className={css.mileage}>
          <p className={css.descriptionText}>Car mileage / km</p>
          <div className={css.range}>
            <Field
              className={`${css.input} ${css.inputMin} `}
              name="minMileage"
              placeholder="From"
            />
            <Field
              className={`${css.input} ${css.inputMin} `}
              name="maxMileage"
              placeholder="To"
            />
          </div>
        </div>
        <button type="submit" className={css.btn}>
          Search
        </button>
      </Form>
    </Formik>
  );
}
