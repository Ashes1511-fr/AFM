# 🚀 LuminexCo - Premium Affiliate Marketing Platform

A cutting-edge, production-ready affiliate marketing platform built with Next.js 14, TypeScript, TailwindCSS, and MongoDB. Features a comprehensive admin dashboard for seamless product and category management.

![AffiliateHub Preview](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop)

## ✨ Features

### 🌟 Public Features
- **Modern Homepage** with hero section, categories, and featured products
- **Product Catalog** with advanced filtering and search
- **Product Details** pages with multiple images and affiliate links
- **Category Pages** for browsing products by category
- **Responsive Design** optimized for mobile and desktop
- **SEO Optimized** with proper meta tags and structured data
- **Fast Performance** with Next.js 14 app directory

### 👨‍💼 Admin Panel Features
- **Secure Authentication** with JWT and httpOnly cookies
- **Dashboard** with analytics and quick actions
- **Product Management** - Add, edit, delete, and toggle products
- **Category Management** - Organize products into categories
- **Image Management** - Multiple images per product
- **Advanced Filtering** - Search and filter products
- **Status Management** - Enable/disable products

### 🔧 Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **shadcn/ui** components
- **MongoDB** with Mongoose
- **JWT Authentication**
- **Responsive Design**
- **SEO Optimized**
- **Production Ready**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Ashes1511-fr/AFM.git
cd affiliate-marketing-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/affiliate-marketing
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/affiliate-marketing

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Seed the Database
```bash
node scripts/seed.js
```

This will create:
- 8 product categories
- 10 sample products
- 1 admin user (admin@example.com / admin123)

### 5. Start Development Server
```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

## 📁 Project Structure

```
affiliate-marketing-website/
├── app/                          # Next.js 14 App Router
│   ├── (public)/                # Public pages
│   │   ├── page.tsx             # Homepage
│   │   ├── products/            # Products catalog
│   │   ├── product/[id]/        # Product details
│   │   ├── categories/[slug]/   # Category pages
│   │   ├── about/               # About page
│   │   └── contact/             # Contact page
│   ├── admin/                   # Admin panel
│   │   ├── layout.tsx           # Admin layout
│   │   ├── login/               # Admin login
│   │   ├── dashboard/           # Admin dashboard
│   │   ├── products/            # Product management
│   │   └── categories/          # Category management
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin API endpoints
│   │   └── products/            # Public API endpoints
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── admin/                   # Admin-specific components
│   ├── Navbar.tsx               # Main navigation
│   ├── Footer.tsx               # Footer component
│   ├── ProductCard.tsx          # Product card component
│   └── ProductFilters.tsx       # Product filtering
├── lib/                         # Utility libraries
│   ├── mongodb.ts               # Database connection
│   ├── models.ts                # Mongoose models
│   ├── auth.ts                  # Authentication utilities
│   └── utils.ts                 # General utilities
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Main types
├── scripts/                     # Utility scripts
│   └── seed.js                  # Database seeding
├── public/                      # Static assets
├── middleware.ts                # Next.js middleware
├── tailwind.config.js           # Tailwind configuration
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🎯 Key Pages & Features

### Public Pages
- **Homepage (`/`)** - Hero section, categories, featured products
- **Products (`/products`)** - Full product catalog with filters
- **Product Details (`/product/[id]`)** - Detailed product view
- **Categories (`/categories/[slug]`)** - Category-specific products
- **About (`/about`)** - About page with company info
- **Contact (`/contact`)** - Contact form and information

### Admin Pages
- **Login (`/admin/login`)** - Secure admin authentication
- **Dashboard (`/admin/dashboard`)** - Analytics and quick actions
- **Products (`/admin/products`)** - Product management interface
- **Add Product (`/admin/products/add`)** - Create new products
- **Edit Product (`/admin/products/edit/[id]`)** - Update products
- **Categories (`/admin/categories`)** - Category management

## 🔐 Authentication

### Admin Access
- **Default Admin**: admin@example.com / admin123
- **Security**: JWT tokens with httpOnly cookies
- **Protection**: Middleware protects all admin routes
- **Session**: 7-day token expiration

### Creating Additional Admins
1. Use the seed script to create new admin users
2. Or manually insert into the database with hashed passwords

## 🎨 Customization

### Styling
- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Custom Colors**: Modify `tailwind.config.js`
- **Responsive**: Mobile-first design approach

### Branding
- Update logo and brand name in `components/Navbar.tsx`
- Modify colors in `app/globals.css`
- Change favicon in `public/`

### Content
- Update homepage content in `app/page.tsx`
- Modify about page in `app/about/page.tsx`
- Customize contact information in `app/contact/page.tsx`

## 📊 Database Schema

### Products
```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  price: number,
  category: string,
  rating: number,
  imageUrls: string[],
  affiliateLink: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Categories
```typescript
{
  _id: ObjectId,
  name: string,
  slug: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Admins
```typescript
{
  _id: ObjectId,
  email: string,
  passwordHash: string,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/affiliate-marketing
JWT_SECRET=your-super-secure-production-secret
NEXTAUTH_SECRET=your-nextauth-production-secret
NEXTAUTH_URL=https://yourdomain.com
```

### Other Platforms
- **Netlify**: Use `npm run build` and deploy `out/` folder
- **Railway**: Connect GitHub and deploy
- **DigitalOcean**: Use Docker or direct deployment

## 📈 SEO & Performance

### SEO Features
- Meta tags for all pages
- OpenGraph tags for social sharing
- Structured data for products
- XML sitemap generation
- Semantic HTML structure

### Performance Optimizations
- Next.js Image optimization
- Static generation where possible
- Lazy loading components
- Efficient database queries
- Optimized bundle size

## 🔧 Development

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
node scripts/seed.js  # Seed database
```

### Adding New Features
1. **New Page**: Create in `app/` directory
2. **New Component**: Add to `components/`
3. **New API Route**: Create in `app/api/`
4. **Database Model**: Update `lib/models.ts`
5. **Types**: Add to `types/index.ts`

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Check if MongoDB is running
- Verify connection string in `.env.local`
- Ensure database permissions (for Atlas)

**Admin Login Not Working**
- Run seed script to create admin user
- Check JWT_SECRET in environment
- Verify password (default: admin123)

**Images Not Loading**
- Check image URLs are valid
- Verify Next.js image domains in config
- Ensure images are publicly accessible

**Build Errors**
- Run `npm install` to ensure dependencies
- Check TypeScript errors
- Verify environment variables

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, please:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with details

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Unsplash](https://unsplash.com/) for demo images
- [Lucide](https://lucide.dev/) for icons

---

**Built with ❤️ using Next.js 14, TypeScript, and TailwindCSS**
