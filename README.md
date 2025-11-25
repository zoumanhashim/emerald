# Panjshir Valley Emerald Bridge

An e-commerce platform dedicated to selling high-quality, ethically sourced emeralds directly from the Panjshir Valley in Afghanistan.

## Features

- **Browse Emeralds**: View all available emeralds with high-resolution images, detailed descriptions, and specifications.
- **Secure Authentication**: User registration and login system.
- **Shopping Basket**: Add emeralds to a basket and proceed to a secure checkout.
- **Order History**: View personal order history with status tracking.
- **Admin Dashboard**: Manage orders, update statuses, and view sales statistics.
- **Emerald Management**: Add, edit, and manage emerald inventory through the Payload CMS admin panel.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Payload CMS 3.0
- **Database**: Neon (or other PostgreSQL provider)
- **Authentication**: Built-in Payload authentication with role-based access
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Collections

### Users
- Email, first name, last name
- Role-based authentication (user/admin)

### Emeralds
- Name, description, price, category (Rough, Cut, Specimen)
- High-resolution image upload
- Detailed specifications: carat weight, dimensions, clarity, color, origin, certification
- Availability toggle

### Orders
- User relationship
- Array of items (emerald + quantity)
- Total amount calculation
- Status tracking (pending/completed/cancelled)

### Media
- Image upload and management
- Alt text for accessibility

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- pnpm 9+
- PostgreSQL database

### Installation

1.  **Clone the repository**
2.  **Install dependencies**: `pnpm install`
3.  **Environment Setup**: Copy `.env.example` to `.env` and configure your variables.
4.  **Start the development server**: `pnpm dev`
5.  **Open your browser**: Navigate to `http://localhost:3000`

### First Time Setup

1.  **Create Admin User**: Visit `/admin` to create your first admin user.
2.  **Seed Data (Optional)**: Use the "Seed your database" button in the admin dashboard to add sample emeralds.
3.  **Add Emeralds**: Use the admin panel to add emerald items with images and details.