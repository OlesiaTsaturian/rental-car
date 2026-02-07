import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get('page') ?? '';
    const limit = request.nextUrl.searchParams.get('limit') ?? '';
    const brand = request.nextUrl.searchParams.get('brand') ?? '';
    const rentalPrice = request.nextUrl.searchParams.get('rentalPrice') ?? '';
    const minMileage = request.nextUrl.searchParams.get('minMileage') ?? '';
    const maxMileage = request.nextUrl.searchParams.get('maxMileage') ?? '';

    const response = await api.get('/cars', {
      params: { page, limit, brand, rentalPrice, minMileage, maxMileage },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Car not found' },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: 'Unexpected server error' },
      { status: 500 },
    );
  }
}
