# 🚀 Quick Start Guide

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages from `package.json`.

### 2. Setup Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Then edit `.env` with your configuration:

```env
NEXT_PUBLIC_APP_NAME=Neurowellness Healthcare Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_AUTH_COOKIE_NAME=neurowellness_auth_token
```

### 3. Run Development Server

```bash
npm run dev
```

Application will be available at: **http://localhost:3000**

### 4. Login Credentials (Development)

Default credentials will depend on your backend setup. Contact your backend team for test accounts.

---

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript type checking

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

---

## Project Structure Quick Reference

```
src/
├── app/                    # Next.js routes
│   ├── (auth)/            # Login, register
│   └── (dashboard)/       # Protected routes
├── components/
│   ├── ui/                # Design system (Button, Input, etc.)
│   └── layout/            # Header, Sidebar
├── features/              # Feature modules
│   └── patients/          # Patient management
├── lib/
│   ├── api/               # API layer (services, axios)
│   ├── hooks/             # React hooks
│   ├── validators/        # Zod schemas
│   └── utils/             # Helper functions
├── store/                 # Zustand stores (UI state only)
└── types/                 # TypeScript definitions
```

---

## Common Tasks

### Adding a New Feature

1. Create folder in `features/`
2. Add components, hooks, types
3. Export via `index.ts`
4. Create route in `app/(dashboard)/`

### Creating a New API Endpoint

1. Add endpoint to `lib/api/endpoints.ts`
2. Create service method in `lib/api/services/`
3. Create React Query hook in `lib/hooks/`
4. Use hook in component

### Adding a New UI Component

1. Create component in `components/ui/`
2. Export from `components/ui/index.ts`
3. Use throughout application

---

## Troubleshooting

### Port 3000 already in use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### TypeScript errors

```bash
npm run type-check
```

### ESLint errors

```bash
npm run lint:fix
```

### Clear cache and reinstall

```bash
rm -rf node_modules .next
npm install
```

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Start development server
4. 📖 Read [ARCHITECTURE.md](./ARCHITECTURE.md) for design patterns
5. 📖 Read [README.md](./README.md) for comprehensive documentation
6. 🔧 Connect to your backend API
7. 🎨 Customize theme in `tailwind.config.ts`
8. 🚀 Start building features!

---

## Getting Help

- Check [README.md](./README.md) for detailed documentation
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for design principles
- Review example implementations in `features/patients/`
- Contact development team for support

---

**Happy Coding! 🎉**
