# ORCHID FURNITURE - Premium eCommerce Platform

**Crafted in Wood. Designed for Life.**

A modern, production-ready full-stack eCommerce application for premium luxury furniture built with Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Stripe.

## 🌟 Features

### Core Functionality
- **Homepage**: Elegant hero section, featured collections, testimonials, and newsletter subscription
- **Product Catalog**: Browse products with advanced filtering (category, wood type, color, price, sorting)
- **Product Details**: Image gallery, wood/color selection, stock management, and add to cart
- **Custom Furniture Builder** ⭐: Main feature - design custom furniture with:
  - Type selection (Chair, Table, Bed, Cabinet, Sofa)
  - Wood type selection with price multipliers
  - Color selection with visual swatches
  - Custom dimensions input (width, height, depth)
  - Finish options (Matte, Glossy, Natural)
  - Reference image upload
  - Live price calculation
  - Visual preview placeholder (3D ready)
- **Shopping Cart**: Slide-in drawer with quantity updates and removal
- **Checkout**: Billing/shipping forms with Stripe integration
- **Admin Dashboard**: Analytics tiles, charts placeholders, order management scaffold

### Technical Features
- ✅ Server-side rendering (SSR) with Next.js 14 App Router
- ✅ TypeScript for type safety
- ✅ Responsive design for all screen sizes
- ✅ Dark mode toggle
- ✅ SEO optimized with meta tags
- ✅ Database-driven content with Prisma ORM
- ✅ RESTful API routes
- ✅ Clean architecture with reusable components

## 🎨 Design

**Brand Colors:**
- Soft Beige: `#F5EFE6`
- Elegant Wood Brown: `#7A5C42`
- Cream White: `#FAF7F2`
- Subtle Orchid Purple: `#A15EA6`

**Design Style:** Premium luxury furniture brand with clean, elegant, minimal UI, smooth hover animations, rounded cards, and loading skeletons.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom primitives (shadcn/ui inspired)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Payment**: Stripe
- **Image Optimization**: Next/Image
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FURNITURE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/orchid_furniture?schema=public"
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name init
   
   # Seed the database
   npm run prisma:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
FURNITURE/
├── app/
│   ├── api/              # API routes
│   │   ├── cart/         # Cart CRUD operations
│   │   ├── checkout/     # Stripe checkout session
│   │   ├── compare/      # Product comparison
│   │   ├── custom/       # Custom price calculation
│   │   ├── orders/       # Order management
│   │   ├── products/     # Product listing with filters
│   │   └── wishlist/     # Wishlist management
│   ├── cart/             # Cart fallback page
│   ├── checkout/         # Checkout page
│   ├── custom/           # Custom Furniture Builder
│   ├── dashboard/        # Admin dashboard
│   ├── product/[id]/     # Product detail page
│   ├── shop/             # Product listing page
│   ├── layout.tsx        # Root layout with Navbar & Footer
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Base UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── textarea.tsx
│   ├── CartDrawer.tsx    # Shopping cart drawer
│   ├── CustomBuilder.tsx # Custom furniture builder
│   ├── FilterSidebar.tsx # Product filters
│   ├── Footer.tsx        # Site footer
│   ├── Navbar.tsx        # Navigation bar
│   ├── ProductCard.tsx   # Product tile
│   └── ProductDetailClient.tsx
├── lib/
│   ├── prisma.ts         # Prisma client singleton
│   ├── stripe.ts         # Stripe SDK configuration
│   └── utils.ts          # Utility functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeder
└── public/               # Static assets
```

## 🗄️ Database Schema

### Models
- **User**: Authentication and profile data
- **Product**: Furniture products with category, pricing, stock
- **WoodType**: Wood types with price multipliers
- **Color**: Color options with hex codes
- **Review**: Product reviews and ratings
- **Order**: Customer orders with status tracking
- **OrderItem**: Individual items in orders
- **Wishlist**: User wishlist
- **WishlistItem**: Items in wishlist
- **CompareItem**: Product comparison list
- **Coupon**: Discount codes

## 🔌 API Endpoints

### Products
- `GET /api/products?category&maxPrice&sort` - List products with filters

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart?id` - Remove cart item

### Custom Pricing
- `POST /api/custom/price` - Calculate custom furniture price

### Checkout
- `POST /api/checkout` - Create Stripe checkout session

### Orders
- `GET /api/orders?userId` - List orders
- `POST /api/orders` - Create order

### Wishlist
- `GET /api/wishlist?userId` - Get wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist?itemId` - Remove from wishlist

### Compare
- `GET /api/compare?userId` - Get comparison list
- `POST /api/compare` - Add to comparison
- `DELETE /api/compare?itemId` - Remove from comparison

## 🎯 Key Features Explained

### Custom Furniture Builder
The standout feature allows customers to:
1. Select furniture type (Chair, Table, Bed, Cabinet, Sofa)
2. Choose wood type with automatic price multiplier
3. Pick color from visual swatches
4. Input custom dimensions (width, height, depth)
5. Select finish (Matte, Glossy, Natural)
6. Upload reference image
7. See live price updates based on selections
8. Add custom item to cart

**Price Calculation Formula:**
```typescript
finalPrice = basePrice × woodMultiplier + sizeAdjustment
```

### Dynamic URL Filters
Shop page uses URL search params for filters, enabling:
- Shareable filtered product lists
- Browser back/forward navigation
- SEO-friendly URLs

## 🔐 Stripe Integration

The checkout flow:
1. Customer fills billing/shipping info
2. System creates Stripe checkout session
3. Customer redirected to Stripe hosted checkout
4. Payment processed securely
5. Customer returned to success/cancel page
6. Webhook updates order status (future enhancement)

## 🚧 Future Enhancements

### MVP Scope (Future PRs)
- [ ] NextAuth.js authentication
- [ ] Database cart persistence
- [ ] Stripe webhook for order status
- [ ] 3D product preview with Three.js
- [ ] AR preview
- [ ] AI-powered recommendations
- [ ] Razorpay payment option
- [ ] Advanced analytics charts
- [ ] Email notifications
- [ ] Order tracking page
- [ ] Product reviews UI
- [ ] Coupon redemption

## 📸 Screenshots

See the pull request for screenshots of the application.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ for premium furniture lovers**