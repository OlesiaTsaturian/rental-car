import axios from 'axios';
import { Brands, Car, CarResponse, CarsQuery } from '../types/car';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const getBrand = async () => {
  const res = await axios.get<Brands>(`/brands`);

  return res.data;
};

export const getCars = async (categoryId?: string) => {
  const res = await axios.get<CarResponse>('/cars', { params: { categoryId } });

  return res.data;
};

export const getCarInfo = async (id: string) => {
  const res = await axios.get<Car>(`/cars/${id}`);

  return res.data;
};

export async function fetchCarsPage(params: CarsQuery): Promise<CarResponse> {
  const res = await axios.get<CarResponse>(`/cars`, {
    params,
  });

  return res.data;
}
