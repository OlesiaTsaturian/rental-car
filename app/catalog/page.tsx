import CarList from '../components/CarList/CarList';
import { getCars } from '../lib/api';

export default async function Catalog() {
  const response = await getCars();
  console.log(response.cars);
  return (
    <section>
      {response?.cars?.length > 0 && <CarList cars={response.cars} />}
    </section>
  );
}
