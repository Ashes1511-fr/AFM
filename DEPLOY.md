# 🚀 LuminexCo Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub repository: `https://github.com/Ashes1511-fr/AFM`
- MongoDB Atlas cluster (provide your connection string)
- Vercel account

### 1. Database Setup
1. **MongoDB Atlas**: Use your existing cluster or create a new one
2. **Database Name**: Use `luminexco` for consistency
3. **Connection String**: You'll need this for environment variables

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Import your repository: `Ashes1511-fr/AFM`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave default (`.next`)
   - **Install Command**: `npm install`

### 3. Environment Variables
In Vercel dashboard, add these environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luminexco
JWT_SECRET=your-32-character-secret-key-here
ADMIN_EMAIL=admin@luminexco.com
ADMIN_PASSWORD=your-secure-password
NODE_ENV=production
```

### 4. Deploy & Test
1. Click **Deploy** - Vercel will build and deploy your site
2. Test your live URL:
   - Homepage loads correctly
   - Products page shows items
   - Admin login works: `/admin/login`
   - Add/edit products in admin panel

### 5. Seed Database (Optional)
After deployment, seed your database with sample products:

```bash
# Local setup
npm install
cp .env.local.example .env.local
# Edit .env.local with your MongoDB connection string
node scripts/seed.js
```

### 6. Custom Domain (Optional)
1. In Vercel dashboard → Domains
2. Add your custom domain
3. Update DNS records as shown

---

## Alternative: Deploy to Render

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables (same as above)

---

## Local Development

```bash
# 1. Clone repository
git clone https://github.com/Ashes1511-fr/AFM.git
cd AFM/affiliate-marketing-website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your values

# 4. Seed database (optional)
node scripts/seed.js

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Checklist

### ✅ Before Deploy
- [ ] MongoDB Atlas cluster ready
- [ ] Environment variables configured
- [ ] Admin credentials set securely
- [ ] Repository is clean (no secrets committed)

### ✅ After Deploy
- [ ] Homepage loads without errors
- [ ] Products page displays correctly
- [ ] Admin panel login works
- [ ] Can add/edit/delete products
- [ ] Images load properly
- [ ] Mobile responsive design works
- [ ] Affiliate links open in new tabs

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.net/db` |
| `JWT_SECRET` | Secret for JWT tokens (32+ chars) | `your-super-secret-key-here` |
| `ADMIN_EMAIL` | Admin login email | `admin@luminexco.com` |
| `ADMIN_PASSWORD` | Admin login password | `SecurePassword123!` |
| `NODE_ENV` | Environment mode | `production` |

---

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Edge Runtime
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with httpOnly cookies
- **UI Components**: shadcn/ui
- **Deployment**: Vercel (recommended)

---

## Support
For deployment issues, check:
1. Vercel build logs for errors
2. Environment variables are set correctly
3. MongoDB connection string is valid
4. Admin credentials work locally

Need help? Check the repository issues or create a new one.