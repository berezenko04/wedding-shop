# Sandrela — Wedding Shop 🧡

> **Live:** [sandrela.xyz](https://sandrela.xyz)

Sandrela is a full-featured wedding fashion e-commerce platform built with **React + NestJS**. It includes a product catalog, shopping cart, order management, Stripe payments, user dashboard, wishlist, reviews, and more.

---

## Features

### For Customers

- **Catalog** — paginated product listing with filtering by category, size (XXS-XXXL), price range, sorting, and search
- **Product Page** — image gallery with lightbox, size picker, discount pricing, reviews & ratings
- **Authentication** — register, login, JWT with httpOnly cookies, device-aware sessions, OTP-based password reset
- **Cart** — add/update/remove items, quantity limits (1–5), live total with discounts
- **Checkout** — shipping address, shipping method (Courier/DHL/Pickup), payment method (Card/PayPal/Amazon)
- **Stripe Checkout** — secure payments with webhook status updates
- **User Dashboard** — order history with CSV export, wishlist, addresses, payment methods, reviews, profile settings
- **Info Pages** — shipping & delivery, returns, payment options, contact, terms of use, privacy policy
- **Responsive UI** — custom MUI theme with wedding color palette and handcrafted typography

### For Developers

- **REST API** with global validation, rate limiting (throttler), security headers (Helmet), CORS
- **Prisma ORM** + PostgreSQL — 14 models, migrations, full type safety
- **Cloudflare R2** — image uploads with automatic WebP conversion and resizing (sharp)
- **Stripe Webhook** — payment event handling with signature verification
- **CSV Export** — single or bulk order export via json2csv
- **Email Service** — Handlebars templates for password reset flow
- **Session Tracking** — audit logging, geolocation by IP, device & browser detection
- **Payment Limits** — max 2 cards, 1 PayPal, 1 Amazon per user

---

## Tech Stack

### Frontend

| Tech | Purpose |
|---|---|
| React 19, TypeScript 5.9 | UI & type safety |
| Vite (rolldown-vite 7) | Build tool |
| React Router 7 | Client-side routing |
| Material UI 7 | Component library & theming |
| Redux Toolkit 2.9 | State management (auth, cart) |
| TanStack React Query 5 | Server state & caching |
| Axios | HTTP client with auto-refresh |
| React Hook Form | Form handling |
| Swiper | Image carousels |

### Backend

| Tech | Purpose |
|---|---|
| NestJS 11, TypeScript | Backend framework |
| Prisma 6 + PostgreSQL | ORM & database |
| Passport.js + JWT | Authentication |
| Stripe 22 | Payment processing |
| Cloudflare R2 (S3-compatible) | Image storage |
| sharp | Image processing |
| Helmet, Throttler | Security |
| @nestjs-modules/mailer | Email delivery |
| json2csv | CSV export |

---

## Project Structure

```
wedding-shop/
├── client/               # React frontend
│   ├── src/
│   │   ├── api/          # Services (auth, cart, products, orders, ...)
│   │   ├── components/   # UI, features, layouts
│   │   ├── redux/        # Redux stores
│   │   └── App.tsx       # Router
│   └── public/           # Static assets
├── server/               # NestJS backend
│   ├── prisma/           # Schema & migrations
│   └── src/
│       ├── modules/      # Feature modules (auth, product, cart, order, stripe, ...)
│       └── common/       # Guards, decorators, filters, DTOs
└── README.md
```

---

## License

MIT © [berezenko04](https://github.com/berezenko04)
