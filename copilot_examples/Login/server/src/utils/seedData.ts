import { Product } from '../models/products';

export const seedProducts = async () => {
  try {
    const sampleProducts = [
      {
        name: 'Sunset Over Mountains',
        description: 'A breathtaking view of golden sunset over mountain ranges',
        price: 25.00,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=500&q=80',
        category: 'landscape',
        available: true
      },
      {
        name: 'City Night Lights',
        description: 'Urban skyline illuminated by vibrant city lights',
        price: 30.00,
        imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&w=500&q=80',
        category: 'urban',
        available: true
      },
      {
        name: 'Ocean Waves',
        description: 'Powerful waves crashing against rocky shores',
        price: 20.00,
        imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&w=500&q=80',
        category: 'nature',
        available: true
      },
      {
        name: 'Forest Path',
        description: 'A mysterious path winding through an ancient forest',
        price: 22.00,
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&w=500&q=80',
        category: 'nature',
        available: true
      },
      {
        name: 'Desert Dunes',
        description: 'Golden sand dunes under a clear blue sky',
        price: 28.00,
        imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&w=500&q=80',
        category: 'landscape',
        available: true
      },
      {
        name: 'Aurora Borealis',
        description: 'Northern lights dancing across the night sky',
        price: 35.00,
        imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&w=500&q=80',
        category: 'landscape',
        available: true
      }
    ];

    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ where: { name: productData.name } });
      if (!existingProduct) {
        await Product.create(productData);
        console.log(`Created product: ${productData.name}`);
      }
    }

    console.log('Sample products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};