# Sozo Healthcare Platform - Frontend

> **Enterprise-grade Next.js healthcare SaaS platform built for scale, maintainability, and long-term evolution**

[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-38bdf8)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture Philosophy](#architecture-philosophy)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [State Management Strategy](#state-management-strategy)
- [API Layer Architecture](#api-layer-architecture)
- [Authentication & Security](#authentication--security)
- [Folder Organization](#folder-organization)
- [Code Standards](#code-standards)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

Sozo Healthcare Platform is a **production-ready, enterprise-scale** frontend application designed to support healthcare operations across multiple roles (patients, doctors, reviewers, administrators).

### Key Features

✅ **Role-Based Access Control** - Fine-grained permissions system  
✅ **Modular Architecture** - Feature-driven organization  
✅ **Type Safety** - Strict TypeScript enforcement  
✅ **State Management** - Disciplined 3-layer approach  
✅ **API Abstraction** - No direct API calls in components  
✅ **Form Validation** - Schema-based with Zod  
✅ **Performance Optimized** - Server components, lazy loading  
✅ **Security First** - Protected routes, JWT handling  
✅ **Scalable Design** - Ready for multi-year feature expansion  

---

## 🏗️ Architecture Philosophy

This application follows **enterprise-grade architectural principles**:

### 1. **Separation of Concerns**
- **UI Components** - Pure presentation logic
- **Business Logic** - Encapsulated in hooks and services
- **Data Layer** - Centralized API client

### 2. **Feature-Driven Structure**
```
Each feature is self-contained with:
- Components (UI)
- Hooks (logic)
- Types (contracts)
- Services (API)
```

### 3. **No Prop Drilling**
- Global state via Zustand (UI only)
- Server state via React Query
- Component state local

### 4. **Type Safety First**
- Strict TypeScript mode
- Zod schema validation
- API response typing

### 5. **Scalability by Design**
- Modular features can be added without core refactor
- Clear boundaries between concerns
- Easy to test and maintain

---

## 🛠️ Technology Stack

### Core Framework
- **Next.js 14+** - App Router, Server Components
- **React 18+** - Latest concurrent features
- **TypeScript 5.4+** - Strict mode enabled

### State Management
- **TanStack Query (React Query)** - Server state, caching
- **Zustand** - Global UI state only
- **React Hook Form** - Form state

### Styling
- **Tailwind CSS** - Utility-first styling
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Class conflict resolution

### Data & Validation
- **Zod** - Schema validation
- **Axios** - HTTP client with interceptors
- **Date-fns** - Date manipulation

### Developer Experience
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - Type-aware linting

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── patients/
│   │   ├── assessments/
│   │   ├── review/
│   │   ├── admin/
│   │   └── settings/
│   └── layout.tsx                # Root layout
│
├── features/                     # Feature modules (feature-driven)
│   ├── patients/
│   │   ├── components/           # Feature-specific components
│   │   ├── hooks/                # Feature-specific hooks
│   │   └── index.ts
│   ├── assessments/
│   ├── auth/
│   └── prs/
│
├── components/                   # Shared components
│   ├── ui/                       # Design system components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── forms/                    # Form components
│
├── lib/                          # Core utilities
│   ├── api/                      # API layer (CRITICAL)
│   │   ├── axios.ts              # Axios instance + interceptors
│   │   ├── endpoints.ts          # Centralized endpoints
│   │   └── services/             # API service methods
│   │       ├── auth.service.ts
│   │       ├── patient.service.ts
│   │       └── ...
│   ├── auth/                     # Auth utilities
│   ├── hooks/                    # Shared React hooks
│   ├── validators/               # Zod schemas
│   ├── utils/                    # Helper functions
│   ├── constants/                # App constants
│   └── providers/                # React context providers
│
├── store/                        # Zustand stores (UI state ONLY)
│   ├── uiStore.ts                # Sidebar, theme, modals
│   └── sessionStore.ts           # Minimal session cache
│
├── styles/                       # Global styles
│   └── globals.css
│
└── types/                        # TypeScript definitions
    ├── auth.types.ts
    ├── patient.types.ts
    ├── api.types.ts
    └── ui.types.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.17.0
- **npm** >= 9.0.0

### Installation

```bash
# Clone repository
git clone <repository-url>
cd sozo-healthcare-platform

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure environment
# Edit .env with your API URL and settings
```

### Environment Variables

```env
# Application
NEXT_PUBLIC_APP_NAME=Sozo Healthcare Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_AUTH_COOKIE_NAME=sozo_auth_token
```

### Development Server

```bash
# Start development server
npm run dev

# Open browser
http://localhost:3000
```

### Build for Production

```bash
# Build application
npm run build

# Start production server
npm start
```

---

## 🔄 Development Workflow

### Code Quality Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check
```

### Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

---

## 🗄️ State Management Strategy

### ⚡ 3-Layer State Architecture

```typescript
┌─────────────────────────────────────────────────────┐
│                  1. SERVER STATE                     │
│              (React Query / TanStack)                │
│                                                      │
│  - All API data                                      │
│  - Cached & auto-refetched                           │
│  - NEVER stored in Zustand                           │
├─────────────────────────────────────────────────────┤
│                 2. GLOBAL UI STATE                   │
│                    (Zustand)                         │
│                                                      │
│  - Sidebar open/close state                          │
│  - Theme preference                                  │
│  - Modal states                                      │
│  - Toast notifications                               │
│  - NO SERVER DATA                                    │
├─────────────────────────────────────────────────────┤
│               3. LOCAL COMPONENT STATE               │
│                  (useState)                          │
│                                                      │
│  - Form input values                                 │
│  - Temporary UI flags                                │
│  - Component-specific state                          │
└─────────────────────────────────────────────────────┘
```

### Example Usage

```typescript
// ✅ CORRECT: Server state via React Query
const { data: patients } = usePatients();

// ✅ CORRECT: UI state via Zustand
const { sidebar, toggleSidebar } = useUIStore();

// ✅ CORRECT: Local state
const [isModalOpen, setIsModalOpen] = useState(false);

// ❌ WRONG: Storing API data in Zustand
// DON'T DO THIS
```

---

## 🌐 API Layer Architecture

### Centralized API Communication

**ALL** API calls go through `lib/api/`:

```typescript
// ✅ CORRECT: Use service methods
import { patientService } from '@/lib/api/services';

const patient = await patientService.getById(id);

// ❌ WRONG: Direct fetch/axios in component
// DON'T DO THIS
```

### API Service Structure

```typescript
// lib/api/services/patient.service.ts
export const patientService = {
  getAll: async (params) => api.get('/patients', { params }),
  getById: async (id) => api.get(`/patients/${id}`),
  create: async (data) => api.post('/patients', data),
  update: async (id, data) => api.patch(`/patients/${id}`, data),
  delete: async (id) => api.delete(`/patients/${id}`),
};
```

### React Query Hooks

```typescript
// lib/hooks/usePatients.ts
export function usePatients(params?) {
  return useQuery({
    queryKey: ['patients', params],
    queryFn: () => patientService.getAll(params),
    staleTime: 30 * 1000,
  });
}
```

### Component Usage

```typescript
// components/PatientList.tsx
export function PatientList() {
  const { data, isLoading } = usePatients();
  
  // Component logic...
}
```

---

## 🔐 Authentication & Security

### Token Management

- **JWT stored in httpOnly cookies** (recommended)
- **Automatic token refresh** via interceptors
- **Protected routes** via middleware

### Route Protection

```typescript
// middleware.ts
export function middleware(request) {
  const token = request.cookies.get('sozo_auth_token');
  
  if (!token && isProtectedRoute) {
    return redirect('/login');
  }
}
```

### Role-Based Access

```typescript
// lib/auth/auth.utils.ts
export function canAccessRoute(path, userRole) {
  const roleRoutes = {
    patient: ['/dashboard', '/assessments'],
    doctor: ['/dashboard', '/patients', '/assessments'],
    admin: ['/dashboard', '/admin', '/patients'],
  };
  
  return roleRoutes[userRole].includes(path);
}
```

---

## 📂 Folder Organization

### Feature Modules

Each feature is **self-contained**:

```
features/patients/
├── components/          # Feature UI
│   ├── PatientList.tsx
│   ├── CreatePatientModal.tsx
│   └── index.ts
├── hooks/              # Feature logic
│   ├── usePatients.ts
│   └── index.ts
├── types/              # Feature types
└── index.ts            # Public API
```

### Adding a New Feature

1. Create folder in `features/`
2. Add components, hooks, types
3. Export via index.ts
4. Use in pages

---

## 📏 Code Standards

### TypeScript Rules

```typescript
// ✅ Strict mode enabled
// ✅ No implicit any
// ✅ Explicit return types for functions
// ✅ Proper type imports

import type { User } from '@/types';

export function getUser(id: string): Promise<User> {
  return userService.getById(id);
}
```

### Component Patterns

```typescript
// ✅ Props interface
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

// ✅ Type-safe component
export function Button({ variant = 'primary', onClick }: ButtonProps) {
  return <button onClick={onClick}>Click</button>;
}
```

### File Naming

- Components: `PascalCase.tsx`
- Hooks: `useHookName.ts`
- Utils: `camelCase.ts`
- Types: `kebab-case.types.ts`

---

## 🐳 Deployment

### Docker

```bash
# Build image
docker build -t sozo-frontend .

# Run container
docker run -p 3000:3000 sozo-frontend

# Or use docker-compose
docker-compose up -d
```

### Production Checklist

- [ ] Environment variables configured
- [ ] API endpoints verified
- [ ] Error tracking (Sentry) enabled
- [ ] Analytics configured
- [ ] Build optimization verified
- [ ] Security headers enabled

---

## 🤝 Contributing

### Development Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Follow code standards**
   - TypeScript strict mode
   - ESLint rules
   - Prettier formatting

3. **Write tests**
   - Component tests
   - Hook tests
   - Integration tests

4. **Submit PR**
   - Clear description
   - Screenshots if UI changes
   - Linked issues

### Code Review Standards

- Type safety verified
- No prop drilling
- API calls in services only
- Proper error handling
- Accessibility considered

---

## 📚 Additional Documentation

- [Architecture Deep Dive](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [State Management Guide](./docs/STATE_MANAGEMENT.md)
- [Component Library](./docs/COMPONENTS.md)

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 💬 Support

For questions or issues:
- Create an issue in the repository
- Contact the development team
- Check internal documentation

---

**Built with ❤️ for enterprise healthcare**
#   s o z o - p l a t f o r m - f r o n t e n d  
 