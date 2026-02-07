'use client';

import Link from 'next/link';

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
