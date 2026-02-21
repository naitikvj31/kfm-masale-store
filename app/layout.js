import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'KFM Masale — Pure & Organic Indian Spices',
  description: 'Shop premium, 100% organic Indian spices from KFM Masale. Turmeric, Garam Masala, and more. Available in 50g to 1kg packs. Direct from farms to your kitchen.',
  keywords: 'organic spices, Indian masale, turmeric, garam masala, cumin, organic masala shop, KFM Masale, buy spices online',
  openGraph: {
    title: 'KFM Masale — Pure & Organic Indian Spices',
    description: 'Shop 100% organic, farm-fresh Indian spices from KFM Masale.',
    type: 'website',
    siteName: 'KFM Masale',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
