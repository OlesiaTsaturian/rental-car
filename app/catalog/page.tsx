import CarList from '../components/CarList/CarList';
import { getCars } from '../lib/api';
import css from './catalog.module.css';

export default async function Catalog() {
  const response = await getCars();

  return (
    <section>
      {response?.cars?.length > 0 && <CarList cars={response.cars} />}
      <button type="submit" className={css.loadMoreBtn}>
        Load more
      </button>
    </section>
  );
}
