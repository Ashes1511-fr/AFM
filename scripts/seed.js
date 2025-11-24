const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/affiliate-marketing';

// Schemas (simplified for seeding)
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  rating: Number,
  imageUrls: [String],
  affiliateLink: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);
const Admin = mongoose.model('Admin', adminSchema);

// Seed data
const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fitness', slug: 'fitness' },
  { name: 'Home & Office', slug: 'home-office' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Books', slug: 'books' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Automotive', slug: 'automotive' },
];

const products = [
  {
    title: 'Premium Wireless Headphones',
    description: 'Experience exceptional sound quality with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio for music, calls, and entertainment. With up to 30 hours of battery life and quick-charge capability, you can enjoy uninterrupted listening throughout your day.',
    price: 199.99,
    category: 'Electronics',
    rating: 4.5,
    imageUrls: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/headphones',
    isActive: true,
  },
  {
    title: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring GPS, heart rate monitoring, sleep tracking, and 50+ workout modes. Water-resistant design perfect for swimming and outdoor activities.',
    price: 299.99,
    category: 'Fitness',
    rating: 4.8,
    imageUrls: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/smartwatch',
    isActive: true,
  },
  {
    title: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long work sessions and maintaining good posture.',
    price: 449.99,
    category: 'Home & Office',
    rating: 4.3,
    imageUrls: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/office-chair',
    isActive: true,
  },
  {
    title: 'Bluetooth Portable Speaker',
    description: 'Powerful Bluetooth speaker with 360-degree sound, waterproof design, and 20-hour battery life. Perfect for outdoor adventures and home entertainment.',
    price: 79.99,
    category: 'Electronics',
    rating: 4.2,
    imageUrls: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/speaker',
    isActive: true,
  },
  {
    title: 'Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning technology, breathable mesh upper, and durable rubber outsole. Designed for comfort and performance.',
    price: 129.99,
    category: 'Fitness',
    rating: 4.6,
    imageUrls: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/running-shoes',
    isActive: true,
  },
  {
    title: 'Premium Coffee Maker',
    description: 'Professional-grade coffee maker with programmable settings, thermal carafe, and built-in grinder. Brew café-quality coffee at home.',
    price: 189.99,
    category: 'Home & Office',
    rating: 4.4,
    imageUrls: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/coffee-maker',
    isActive: true,
  },
  {
    title: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.',
    price: 39.99,
    category: 'Electronics',
    rating: 4.1,
    imageUrls: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/wireless-charger',
    isActive: true,
  },
  {
    title: 'Yoga Mat',
    description: 'Non-slip yoga mat made from eco-friendly materials. Extra thick for comfort and joint protection during workouts and meditation.',
    price: 49.99,
    category: 'Fitness',
    rating: 4.7,
    imageUrls: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/yoga-mat',
    isActive: true,
  },
  {
    title: 'Desk Lamp with USB Charging',
    description: 'LED desk lamp with adjustable brightness, color temperature control, and built-in USB charging ports. Perfect for office and study.',
    price: 69.99,
    category: 'Home & Office',
    rating: 4.5,
    imageUrls: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/desk-lamp',
    isActive: true,
  },
  {
    title: 'Backpack for Laptop',
    description: 'Durable laptop backpack with padded compartments, water-resistant material, and multiple pockets for organization. Fits laptops up to 15.6 inches.',
    price: 89.99,
    category: 'Fashion',
    rating: 4.3,
    imageUrls: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    ],
    affiliateLink: 'https://example.com/laptop-backpack',
    isActive: true,
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Admin.deleteMany({});

    // Seed categories
    console.log('Seeding categories...');
    await Category.insertMany(categories);
    console.log(`Seeded ${categories.length} categories`);

    // Seed products
    console.log('Seeding products...');
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    // Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('Work@1511#', 12);
    await Admin.create({
      email: 'workwithme153@gmail.com',
      passwordHash: hashedPassword,
    });
    console.log('Created admin user');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`   • ${categories.length} categories`);
    console.log(`   • ${products.length} products`);
    console.log(`   • 1 admin user`);
    console.log('\n🔐 Admin Panel: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };