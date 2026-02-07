import axios from 'axios';
import { Car, CarResponse, CarsQuery } from '../types/car';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = async (params: CarsQuery): Promise<CarResponse> => {
  const { data } = await axios.get<CarResponse>('/cars', { params });

  return data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await axios.get<Car>(`/cars/${id}`);

  return data;
};
