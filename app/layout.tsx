import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from './components/Header/Header';
import TanStackProvider from './components/TanStackProvider/TanStackProvider';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rental Car',
  description: 'Choose a car for rent',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
