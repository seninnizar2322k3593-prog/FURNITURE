'use client';

import './globals.css';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer, { CartItem } from '@/components/CartDrawer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ORCHID FURNITURE - Crafted in Wood. Designed for Life.</title>
        <meta name="description" content="Premium luxury furniture for your home. Customize and order handcrafted wooden furniture." />
        <meta property="og:title" content="ORCHID FURNITURE" />
        <meta property="og:description" content="Crafted in Wood. Designed for Life." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItems.length} />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </body>
    </html>
  );
}
