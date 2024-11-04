# Factometric UI

A modern dashboard application built with Next.js for visualizing and managing metrics data.

## Tech Stack

- **Framework**: Next.js 15.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI primitives
  - Shadcn/UI components
- **Data Visualization**: Recharts
- **Form Handling**: React Hook Form + Zod
- **API Integration**: Custom, yet simple API client

## Features

- 📊 Real-time metrics dashboard
- 📈 Interactive analytics charts
- 🔄 CRUD operations for metrics
- 📋 Data filtering and pagination
- 🎯 Type-safe forms with validation

## Getting Started

1. **Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Environment Setup**

Modify your `.env` file to match your local API server URL.

3. **Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```
web/
├── src/
│ ├── app/ # Next.js app router pages
│ ├── components/ # Reusable components
│ │ ├── ui/ # Base UI components
│ │ └── app-/ # Application-specific components
│ ├── lib/ # Utilities and API clients
│ │ ├── api/ # API integration
│ │ └── utils/ # Helper functions
│ ├── hooks/ # Custom React hooks
│ └── types/ # TypeScript type definitions
├── public/ # Static assets
└── tailwind.config.ts # Tailwind CSS configuration
```

## Key Components

- **Dashboard**: Real-time metrics visualization
- **Metrics Management**: CRUD interface for metrics data
- **Analytics**: Advanced data analysis and charts

## API Integration

The application communicates with a backend API through a custom client configured in `src/lib/api/`. The base URL and other configurations can be found in `src/lib/api/config.ts`.

## Styling

- Uses Tailwind CSS for styling
- Custom theme configuration in `tailwind.config.ts`
- CSS variables for dynamic theming
- Responsive design patterns