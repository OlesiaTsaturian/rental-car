export type Car = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  mileage: number;
  rentalConditions: string[];
};

export type CarResponse = {
  cars: Car[];
  totalCars: number;
  page: string;
  totalPages: number;
};

export type CarsQuery = {
  page: number;
  limit: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
};

export type Brands = string[];

export type FilterValues = Pick<
  CarsQuery,
  'brand' | 'rentalPrice' | 'minMileage' | 'maxMileage'
>;
