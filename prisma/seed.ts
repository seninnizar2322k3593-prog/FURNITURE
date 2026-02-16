import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create wood types
  const teak = await prisma.woodType.upsert({
    where: { name: 'Teak' },
    update: {},
    create: {
      name: 'Teak',
      priceMultiplier: 1.5,
    },
  });

  const oak = await prisma.woodType.upsert({
    where: { name: 'Oak' },
    update: {},
    create: {
      name: 'Oak',
      priceMultiplier: 1.3,
    },
  });

  const sheesham = await prisma.woodType.upsert({
    where: { name: 'Sheesham' },
    update: {},
    create: {
      name: 'Sheesham',
      priceMultiplier: 1.0,
    },
  });

  const walnut = await prisma.woodType.upsert({
    where: { name: 'Walnut' },
    update: {},
    create: {
      name: 'Walnut',
      priceMultiplier: 1.4,
    },
  });

  console.log('✅ Created wood types');

  // Create colors
  const natural = await prisma.color.upsert({
    where: { name: 'Natural' },
    update: {},
    create: {
      name: 'Natural',
      hexCode: '#D2B48C',
    },
  });

  const walnutColor = await prisma.color.upsert({
    where: { name: 'Walnut' },
    update: {},
    create: {
      name: 'Walnut',
      hexCode: '#5C4033',
    },
  });

  const mahogany = await prisma.color.upsert({
    where: { name: 'Mahogany' },
    update: {},
    create: {
      name: 'Mahogany',
      hexCode: '#C04000',
    },
  });

  const white = await prisma.color.upsert({
    where: { name: 'White' },
    update: {},
    create: {
      name: 'White',
      hexCode: '#FFFFFF',
    },
  });

  console.log('✅ Created colors');

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      name: 'Classic Dining Chair',
      description: 'Elegant dining chair crafted from premium wood with comfortable seating and timeless design.',
      basePrice: 12999,
      category: 'Chair',
      stock: 25,
      images: [
        'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
      ],
      woodTypes: {
        connect: [{ id: teak.id }, { id: oak.id }, { id: sheesham.id }],
      },
      colors: {
        connect: [{ id: natural.id }, { id: walnutColor.id }],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Executive Office Table',
      description: 'Spacious and sturdy office table with smooth finish. Perfect for home offices and professional workspaces.',
      basePrice: 34999,
      category: 'Table',
      stock: 15,
      images: [
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
      ],
      woodTypes: {
        connect: [{ id: walnut.id }, { id: oak.id }],
      },
      colors: {
        connect: [{ id: walnutColor.id }, { id: mahogany.id }],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Luxury King Size Bed',
      description: 'Premium king size bed with elegant headboard. Crafted for comfort and style.',
      basePrice: 54999,
      category: 'Bed',
      stock: 10,
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800',
      ],
      woodTypes: {
        connect: [{ id: teak.id }, { id: walnut.id }],
      },
      colors: {
        connect: [{ id: natural.id }, { id: white.id }],
      },
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: 'Modern Storage Cabinet',
      description: 'Multi-purpose storage cabinet with shelves and drawers. Ideal for living rooms and bedrooms.',
      basePrice: 28999,
      category: 'Cabinet',
      stock: 20,
      images: [
        'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800',
        'https://images.unsplash.com/photo-1595428773946-b1bdb3319b5f?w=800',
      ],
      woodTypes: {
        connect: [{ id: sheesham.id }, { id: oak.id }],
      },
      colors: {
        connect: [{ id: natural.id }, { id: walnutColor.id }],
      },
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: 'Premium Sofa Set',
      description: 'Comfortable 3-seater sofa with plush cushions and wooden frame. Perfect for your living room.',
      basePrice: 64999,
      category: 'Sofa',
      stock: 8,
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
      ],
      woodTypes: {
        connect: [{ id: teak.id }, { id: walnut.id }],
      },
      colors: {
        connect: [{ id: natural.id }, { id: mahogany.id }],
      },
    },
  });

  console.log('✅ Created sample products');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@orchidfurniture.com' },
    update: {},
    create: {
      email: 'admin@orchidfurniture.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
