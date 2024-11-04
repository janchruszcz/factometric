# Factometric Frontend

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
- **API Integration**: Custom API client

## Features

- 📊 Real-time metrics dashboard
- 📈 Interactive analytics charts
- 📱 Responsive design with mobile support
- 🎨 Modern UI with dark/light mode support
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

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

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
- **Sidebar**: Responsive navigation component

## API Integration

The application communicates with a backend API through a custom client configured in `src/lib/api/`. The base URL and other configurations can be found in `src/lib/api/config.ts`.

## Styling

- Uses Tailwind CSS for styling
- Custom theme configuration in `tailwind.config.ts`
- CSS variables for dynamic theming
- Responsive design patterns

## Development Guidelines

1. **Component Structure**
   - Use TypeScript for all components
   - Implement proper type definitions
   - Follow the established component patterns

2. **State Management**
   - Use React hooks for local state
   - Implement proper error handling
   - Use suspense boundaries for loading states

3. **Code Style**
   - Follow ESLint configuration
   - Use proper TypeScript types
   - Maintain consistent naming conventions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.