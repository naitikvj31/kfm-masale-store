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
  title: 'KFM Masale — Pure & Organic Indian Spices | Buy Best Spices Online',
  description: 'Shop premium, 100% organic Indian spices from KFM Masale. Turmeric, Garam Masala, Cumin, Red Chili, and more. Farm-fresh, authentic, no preservatives. Order best masalas online today.',
  keywords: 'kfm masale, spices, pure spices, organic indian spices, best spices online, buy spices online india, authentic indian spices, fresh ground spices, wholesale spices india, premium quality masalas, natural herbs and spices, kfm masale kishangarh, rajasthan spices online, highest quality spices, bulk masalas, export quality spices, farm fresh spices, homemade masalas, traditional stone ground spices, chemical free spices, no preservatives spices, pure turmeric powder, organic haldi online, best garam masala powder, pure red chili powder, authentic cumin seeds, jeera powder online, coriander powder, dhaniya powder, pure hing, asafoetida online, black pepper powder, kali mirch, dry ginger powder, saunth, amchur powder, dry mango powder, kasuri methi, fenugreek leaves, green cardamom, hari elaichi, cloves, laung, cinnamon sticks, dalchini, bay leaves, tej patta, black cardamom, badi elaichi, mace, javitri, nutmeg, jaiphal, star anise, chakri phool, mustard seeds, sarson, fennel seeds, saunf, carom seeds, ajwain, sesame seeds, til, poppy seeds, khus khus, rock salt, sendha namak, black salt, kala namak, chaat masala, chhole masala, pav bhaji masala, sambar masala, rasam powder, meat masala, chicken masala, biryani masala, kitchen king masala, tea masala, chai patti masala, authentic rajasthani spices, rajasthani mirchi powder, mathania red chilli, kashmiri lal mirch powder, spicy masale, organic spice store, best spice brand in india, buy pure spices, rajasthani spices supplier, top indian spice company, natural food spices, organic culinary spices, unadulterated masalas, indian cooking spices, spice blends for cooking, masale for daily use, best quality hing, premium haldi powder, raw spices online, whole spices wholesale, indian herbs store',
  openGraph: {
    title: 'KFM Masale — Pure & Organic Indian Spices',
    description: 'Shop 100% organic, farm-fresh Indian spices. Order premium, authentic stone-ground masalas online from KFM Masale.',
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
