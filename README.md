# Glossary Mart 🛒

**Glossary Mart** is a modern, full-stack online grocery and daily essentials e-commerce application built with Next.js 15. The platform allows users to browse products, manage their cart, create wishlists, and place orders smoothly, while providing a comprehensive admin dashboard for store owners to manage inventory and view insights.

## 🚀 Features

### **Customer Features**
- **User Authentication**: Secure sign-up, login, and profile management using Clerk.
- **Product Discovery**: Browse products categories, search with autocomplete, and view detailed product pages.
- **Shopping Cart & Checkout**: Add products to cart, specify delivery addresses, and seamless payment integration via Razorpay.
- **Order Tracking**: View past orders and track current delivery statuses.
- **Wishlist Management**: Save favorite items and share wishlists with others.
- **Responsive Design**: Beautiful, mobile-first design built with Tailwind CSS and Framer Motion for animations.
- **SEO Optimized**: Dynamic metadata and structured sitemaps for best search engine rankings.

### **Admin/Owner Features**
- **Dashboard & Analytics**: Track sales, orders, and view metrics visually via Chart.js.
- **Inventory Management**: Add, update, and manage products.
- **Order Management**: Review customer orders and update their delivery status.
- **Image Hosting**: Secure image uploads and hosting through Cloudinary integration.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Lucide React
- **Backend/Database**: Node.js, MongoDB (Mongoose ORM)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Payments**: Razorpay
- **Image Storage**: Cloudinary
- **Charts**: Chart.js & React-Chartjs-2
- **Testing**: Jest & React Testing Library

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm/yarn installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd glossary-mart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add the following keys. Make sure to replace the placeholder values with your actual credentials.

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB_NAME=glossary-mart

   # Razorpay Payments
   RAZORPAY_KEY_ID=your_razorpay_key_id
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   # Cloudinary Image Hosting
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Site Variables
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_CURRENCY=INR

   # Analytics / APIs (Optional)
   ENABLE_API_CACHE=true
   METRICS_API_KEY=your_custom_metrics_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📁 Project Structure

```bash
├── app/               # Next.js App Router (Pages & API routes)
│   ├── api/           # Backend API routes for products, users, payments
│   ├── owner/         # Admin Dashboard pages
│   └── ...            # Generic UI routes (cart, checkout, product)
├── components/        # Reusable React components
├── config/            # Application & Database Configuration
├── context/           # React Context (State management)
├── lib/               # Utility functions and helpers
├── models/            # MongoDB Mongoose schemas (User, Product, Orders, etc.)
└── public/            # Static assets
```

## 🧪 Testing

The project uses Jest for unit testing. To run the test suites:
```bash
npm run test           # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run test coverage report
```

## 📜 License

This project is proprietary and confidential.


