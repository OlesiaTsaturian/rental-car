'use client';
import { getBrand } from '@/app/lib/clientApi';
import { CarsQuery, FilterValues } from '@/app/types/car';
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
  onReset,
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
      <Form>
        <label htmlFor="brand">Car brand </label>
        <Field as="select" name="brand">
          <option value="">Choose a brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </Field>
        <label htmlFor="rentalPrice">Price/ 1 hour </label>
        <Field as="select" name="rentalPrice">
          <option value="">Choose a price</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
        </Field>

        <label>
          Car mileage / km
          <Field type="text" name="minMileage" />
          <Field type="text" name="maxMileage" />
        </label>
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
