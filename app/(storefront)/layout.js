import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AnnouncementBar from '@/components/AnnouncementBar';

export default function StorefrontLayout({ children }) {
    return (
        <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <CartDrawer />
            <div style={{ minHeight: 'calc(100vh - 300px)' }}>
                {children}
            </div>
            <Footer />
            <WhatsAppButton />
        </CartProvider>
    );
}
