import axios from 'axios';

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
  accessories: [];
  functionalities: [];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  mileage: number;
};

export type CarResponse = {
  cars: Car[];
  totalCars: number;

  //!!!!!!!!!!! Delete if not use!!!!!!!!!!!!

  page?: number;
  totalPages?: number;
};

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const getCars = async () => {
  const res = await axios.get<CarResponse>('/cars');

  return res.data;
};
