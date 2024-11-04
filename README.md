# Factometric

A simple full-stack application (Rails API + Next.js) for visualizing and managing metrics data with real-time analytics capabilities. Solution is built with aim for easiness of development and scalability - that's why it's using sophisticated, developer-friendly technologies for both frontend and backend.

<div style="display: flex; gap: 20px;">
    <img src="./web/public/dashboard.png" width="400" alt="Dashboard" />
    <img src="./web/public/analytics.png" width="400" alt="Analytics" />
</div>

## Overview

The project consists of two main components:

- [**Frontend**](web/README.md): A Next.js 15.0 application with TypeScript and Tailwind CSS
- [**Backend**](api/README.md): A Rails 7.1 API with PostgreSQL database

## Architecture

### Frontend Architecture

- **Framework**: Next.js 15.0
- **Type Safety**: Full TypeScript implementation
- **Component Structure**: 
  - UI components built with Radix UI primitives
  - Shadcn/UI for consistent design system
  - Chart components using Recharts
- **API Integration**: Custom, yet simple API client with type-safe requests
- **State Management**: React hooks for local state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture

- **Framework**: Rails 7.1 API-only mode
- **Database**: PostgreSQL with optimized schema for time-series data
- **API Design**: RESTful endpoints with versioning (v1)
- **Pagination**: Implemented using Pagy gem (great performance)
- **Testing**: MiniTest suite for API

## Key Features

- 📊 Real-time metrics dashboard
- 📈 Interactive analytics visualization
- 🔄 CRUD operations for metrics data
- 🔒 Type-safe API integration
- 📋 Data filtering and pagination
- 📊 Time-series data analysis

## Getting Started

1. Clone the repository
2. Set up the backend:
```bash
cd api
bundle install
rails db:create
rails db:migrate
rails db:seed
rails s -p 3001
```

3. Set up the frontend:
```bash
cd web
pnpm install
pnpm run dev
```

4. Modify your .env and CORS config to match your local environment

5. Open [http://localhost:3000](http://localhost:3000)

## Next Steps

1. **Authentication & Authorization**
   - Implement user authentication
   - Role-based access control
   - API token management

2. **Testing**
   - Increase test coverage
   - Add frontend tests
   - Add end-to-end tests

3. **DevOps**
   - Set up Docker
   - Set up CI/CD pipeline
   - Add monitoring and logging

4. **Enhanced Analytics**
   - Add more visualization options (multiple metrics, timeframes, charts, etc.)
   - Implement data export features
   - Add custom metric calculations

5. **Performance Optimization**
   - Implement caching strategy
   - Optimize database queries


## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
