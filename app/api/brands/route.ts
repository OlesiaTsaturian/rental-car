import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const response = await api.get('/brands');

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
