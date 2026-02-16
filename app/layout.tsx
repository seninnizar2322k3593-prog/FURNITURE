import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/lib/cart-context';

export const metadata = {
  title: 'ORCHID FURNITURE - Crafted in Wood. Designed for Life.',
  description: 'Premium luxury furniture for your home. Customize and order handcrafted wooden furniture.',
  openGraph: {
    title: 'ORCHID FURNITURE',
    description: 'Crafted in Wood. Designed for Life.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
