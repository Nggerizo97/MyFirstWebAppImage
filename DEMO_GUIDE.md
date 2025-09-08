# Image Purchase System - Demo Guide

## Overview
This enhanced image gallery and purchase system provides a complete e-commerce solution for selling digital images with the following features:

## Key Features Implemented

### 🎨 Gallery-First Experience
- **Default Page**: Image gallery is now the landing page (not login)
- **Public Access**: Users can browse images without authentication
- **Responsive Design**: Modern card-based layout with Bootstrap

### 🔐 Authentication System
- **Optional Login**: Users only need to login to purchase
- **Session Management**: JWT-based authentication with persistent sessions
- **Smart Redirects**: Automatic redirect to login when purchase is attempted

### 🛒 Shopping Cart System
- **Individual Image Purchases**: No quantity selectors (each image is unique)
- **Variable Pricing**: Customers can pay more than the base price to support the artist
- **Persistent Cart**: Shopping cart persists across browser sessions
- **Real-time Updates**: Cart count updates in navigation

### 💳 Payment Integration
- **Mock Payment System**: Test payment processing for development
- **Stripe Ready**: Integration prepared for Stripe test/live keys
- **Order Tracking**: Complete order lifecycle management

### 📊 Order Management
- **Order History**: Users can view their purchase history
- **Status Tracking**: Orders track payment status (pending, paid, failed, cancelled)
- **Order Details**: Full order information with image previews

## Technical Architecture

### Backend (Node.js + TypeScript)
```
src/
├── controllers/
│   ├── user.ts          # User authentication
│   ├── product.ts       # Image/product management
│   ├── order.ts         # Order processing
│   └── payment.ts       # Payment processing
├── models/
│   ├── user.ts          # User model (username, email, password)
│   ├── products.ts      # Product model (name, description, price, imageUrl, category)
│   ├── order.ts         # Order model (userId, productId, amount, status, paymentId)
│   └── server.ts        # Express server configuration
├── routes/
│   ├── user.ts          # Authentication routes
│   ├── product.ts       # Product routes (public & authenticated)
│   ├── order.ts         # Order management routes
│   └── payment.ts       # Payment processing routes
├── services/
│   └── paymentService.ts # Payment processing logic
└── utils/
    └── seedData.ts      # Sample data seeder
```

### Frontend (Angular 16)
```
src/app/
├── components/
│   ├── dashboard/       # Main gallery component
│   ├── login/           # Authentication
│   ├── navbar/          # Navigation with cart
│   └── orders/          # Order history
├── services/
│   ├── auth.service.ts  # Authentication management
│   └── product.service.ts # API communication
└── app-routing.module.ts # Route configuration
```

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Optional, Unique)
- password (Hashed with bcrypt)
- createdAt, updatedAt

### Products Table
- id (Primary Key)
- name
- description
- price (Base price)
- imageUrl
- category
- available (Boolean)
- createdAt, updatedAt

### Orders Table
- id (Primary Key)
- userId (Foreign Key)
- productId (Foreign Key)
- amount (Final price paid)
- status (pending, paid, failed, cancelled)
- paymentId (Payment gateway reference)
- paymentMethod (test, stripe, paypal)
- createdAt, updatedAt

## API Endpoints

### Public Endpoints
```
GET /api/product/public     # Get all available images
GET /api/product/:id        # Get single image details
```

### Authenticated Endpoints
```
POST /api/user/             # User registration
POST /api/user/login        # User login
GET /api/product/           # Get all products (admin view)
POST /api/order/            # Create new order
GET /api/order/             # Get user's orders
PUT /api/order/:id/status   # Update order status
POST /api/payment/process   # Process payment
POST /api/payment/create-intent # Create payment intent
```

## Sample Data
The system includes 6 high-quality sample images from Unsplash:
- Sunset Over Mountains ($25)
- City Night Lights ($30)
- Ocean Waves ($20)
- Forest Path ($22)
- Desert Dunes ($28)
- Aurora Borealis ($35)

## How to Use

1. **Browse Gallery**: Visit the main page to see available images
2. **Select Images**: Choose images and set your preferred price (minimum enforced)
3. **Add to Cart**: Images are added to persistent shopping cart
4. **Login**: Click login when ready to purchase
5. **Checkout**: Process all cart items as individual orders
6. **View Orders**: Check order history and status

## Payment Integration

### Development Mode
- Uses mock payment system for testing
- All payments under $1000 succeed
- Generates realistic payment IDs

### Production Ready
- Stripe integration prepared
- Add STRIPE_SECRET_KEY to environment
- Support for payment intents and webhooks

## Future Enhancements (Suggested in Issue)

### AWS Architecture Recommendations
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │────│   API Gateway   │────│     Lambda      │
│  (Static Site)  │    │   (REST API)    │    │  (Backend Logic)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│       S3        │    │      RDS        │    │    Cognito      │
│  (Image Storage)│    │   (Database)    │    │ (Authentication)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Benefits of AWS Migration
- **S3 + CloudFront**: Cost-effective image storage and CDN delivery
- **Lambda**: Serverless backend reduces operational costs
- **RDS**: Managed database with automatic backups
- **Cognito**: Built-in authentication with social login
- **API Gateway**: Auto-scaling API with built-in security

### Cost Optimization Strategies
1. **S3 Intelligent Tiering**: Automatic cost optimization for image storage
2. **Lambda + API Gateway**: Pay-per-request pricing model
3. **CloudFront**: Reduce bandwidth costs with edge caching
4. **Reserved Instances**: For predictable RDS workloads

## Development Setup

1. **Install Dependencies**:
   ```bash
   # Backend
   cd copilot_examples/Login/server
   npm install
   
   # Frontend  
   cd copilot_examples/Login/front
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   # server/.env
   PORT=3001
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=password
   DB_NAME=image_gallery
   SECRET_KEY=your_jwt_secret
   STRIPE_SECRET_KEY=sk_test_... (optional)
   ```

3. **Build and Run**:
   ```bash
   # Backend
   npm run typescript  # Compile TypeScript
   npm run dev        # Start development server
   
   # Frontend
   ng serve           # Start Angular development server
   ```

The system is now production-ready with a complete image purchasing workflow, modern UI/UX, and extensible architecture for future enhancements.