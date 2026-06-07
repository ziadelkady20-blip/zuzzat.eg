# ZUZZAT Platform ☕

> **Stay Cool, Drink Better** — Enterprise Cafe & Beverage Management Platform

## Features

| Module | Description |
|--------|-------------|
| 📊 Dashboard | Real-time KPIs, revenue, best sellers |
| 🖥 POS System | Fast ordering with promo codes & cart |
| 👨‍🍳 Kitchen Display | Live order queue with status updates |
| 📋 Orders | All orders with filtering & export |
| 🪑 Tables | Visual floor plan with live status |
| 📱 QR Ordering | Per-table QR codes for self-ordering |
| 🍹 Menu Manager | Products, categories, availability |
| 📦 Inventory | Stock tracking with low-stock alerts |
| ⭐ Loyalty | Points, rewards, member tiers |
| 🎟 Promos | Discount codes with analytics |
| 🛵 Delivery | Delivery order tracking |
| 👥 Customers | Customer database & history |
| 📈 Analytics | Revenue charts & reports |
| ⚙️ Settings | Brand, receipts, notifications |

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Deployment**: Vercel

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/zuzzat.git
cd zuzzat
npm install
```

### 2. Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password)
3. Enable **Firestore Database**
4. Enable **Storage**
5. Copy your config values

### 3. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B — GitHub Integration

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Add environment variables in Vercel dashboard
5. Click **Deploy**

## Brand Colors

| Color | Hex |
|-------|-----|
| Primary Blue | `#1E3ABA` |
| Orange | `#F5A623` |
| Green | `#A4B55A` |
| Red | `#FF6B6B` |
| White | `#FFFFFF` |

## Role System

| Role | Access |
|------|--------|
| Super Admin | Full access |
| Admin | Orders, menu, customers, reports |
| Cashier | POS only |
| Kitchen | KDS only |
| Inventory Manager | Inventory only |
| Customer | Customer portal |

---

Made with ❤️ for ZUZZAT Coffee Shop
