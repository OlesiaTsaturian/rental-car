import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;

    const response = await api.get(`/cars/${id}`);

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
