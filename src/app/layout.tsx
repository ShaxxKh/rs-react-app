import './index.css';
import type { Metadata } from 'next';
import { RootClientComponent } from './root';

export const metadata: Metadata = {
  title: 'Pages router -> App router',
  icons: '/react.svg',
  description: 'Welcome to Next.js App router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="root">
        <RootClientComponent>{children}</RootClientComponent>
      </body>
    </html>
  );
}
