# Sozo Healthcare Platform - Architecture Guide

## 🏛️ Architectural Philosophy

This document explains the **why** and **how** of our architectural decisions.

---

## 🎯 Core Principles

### 1. Separation of Concerns

Every piece of code has a **single, well-defined responsibility**.

```
Components     → Render UI
Hooks          → Manage logic
Services       → Communicate with API
Stores         → Manage global UI state
Types          → Define contracts
```

### 2. No Mixed Responsibilities

❌ **NEVER** do this:

```typescript
// BAD: Component doing everything
function PatientList() {
  const [patients, setPatients] = useState([]);
  
  useEffect(() => {
    fetch('/api/patients')  // ❌ Direct API call
      .then(res => res.json())
      .then(setPatients);
  }, []);
  
  return <div>{/* render */}</div>;
}
```

✅ **DO** this:

```typescript
// GOOD: Separated concerns

// Hook: usePatients.ts
export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getAll,  // ✅ Service method
  });
}

// Component: PatientList.tsx
function PatientList() {
  const { data: patients } = usePatients();  // ✅ Hook for logic
  return <div>{/* render */}</div>;
}
```

---

## 📊 State Management Architecture

### The 3-Layer Model

```typescript
┌──────────────────────────────────────┐
│     LAYER 1: SERVER STATE            │
│     (React Query)                    │
│                                      │
│  Purpose: API data, caching          │
│  Examples:                           │
│  - Patient list                      │
│  - User profile                      │
│  - Assessment data                   │
│                                      │
│  ✅ Auto-caching                      │
│  ✅ Background refetch                │
│  ✅ Optimistic updates                │
│  ✅ Request deduplication             │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│     LAYER 2: GLOBAL UI STATE         │
│     (Zustand)                        │
│                                      │
│  Purpose: Cross-component UI state   │
│  Examples:                           │
│  - Sidebar open/close                │
│  - Theme (light/dark)                │
│  - Modal visibility                  │
│  - Toast notifications               │
│                                      │
│  ⚠️ NO SERVER DATA HERE               │
│  ✅ Lightweight                       │
│  ✅ Persistent (localStorage)         │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│     LAYER 3: LOCAL STATE             │
│     (useState)                       │
│                                      │
│  Purpose: Component-specific state   │
│  Examples:                           │
│  - Form inputs                       │
│  - Dropdown open/close               │
│  - Temporary flags                   │
│                                      │
│  ✅ Scoped to component               │
│  ✅ Short-lived                       │
└──────────────────────────────────────┘
```

### Decision Tree: Where Should State Live?

```
Is it from the API?
├─ YES → React Query
└─ NO → Is it shared across components?
        ├─ YES → Zustand (if UI-related)
        └─ NO → useState (local)
```

---

## 🌐 API Layer Design

### Why Centralized?

1. **Single source of truth** for API endpoints
2. **Consistent error handling** across app
3. **Automatic token management**
4. **Easy to mock** for testing
5. **Type safety** throughout

### Architecture

```typescript
┌─────────────────────────────────────┐
│          COMPONENT LAYER            │
│                                     │
│  ❌ NO direct API calls allowed     │
│  ✅ Use hooks only                  │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│          HOOK LAYER                 │
│      (usePatients, useAuth)         │
│                                     │
│  - React Query wrapper              │
│  - Cache configuration              │
│  - Query key management             │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│         SERVICE LAYER               │
│     (patientService)                │
│                                     │
│  - Business logic                   │
│  - Data transformation              │
│  - Type definitions                 │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│          AXIOS CLIENT               │
│      (interceptors)                 │
│                                     │
│  - Token injection                  │
│  - Error normalization              │
│  - Request/response transform       │
└─────────────────────────────────────┘
                ↓
              [API]
```

### Example Flow

```typescript
// 1. Component uses hook
function PatientList() {
  const { data } = usePatients({ status: 'active' });
}

// 2. Hook calls service
export function usePatients(params) {
  return useQuery({
    queryKey: ['patients', params],
    queryFn: () => patientService.getAll(params),  // ← Service
  });
}

// 3. Service uses API client
export const patientService = {
  getAll: (params) => api.get('/patients', { params }),  // ← Axios
};

// 4. Axios adds token & handles errors
apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

---

## 🔐 Authentication Flow

### Token Management

```typescript
┌───────────────────────────────────────┐
│         1. USER LOGS IN               │
└───────────────────────────────────────┘
                ↓
┌───────────────────────────────────────┐
│    2. BACKEND RETURNS JWT             │
└───────────────────────────────────────┘
                ↓
┌───────────────────────────────────────┐
│  3. STORE IN HTTPONLY COOKIE          │
│     (Most secure)                     │
│                                       │
│  OR localStorage (fallback)           │
└───────────────────────────────────────┘
                ↓
┌───────────────────────────────────────┐
│  4. AXIOS INTERCEPTOR ADDS TO         │
│     ALL REQUESTS                      │
└───────────────────────────────────────┘
                ↓
┌───────────────────────────────────────┐
│  5. IF 401 → AUTO REFRESH TOKEN       │
└───────────────────────────────────────┘
                ↓
┌───────────────────────────────────────┐
│  6. IF REFRESH FAILS → LOGOUT         │
└───────────────────────────────────────┘
```

### Route Protection

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('sozo_auth_token');
  const isProtected = PROTECTED_ROUTES.includes(pathname);
  
  if (isProtected && !token) {
    return NextResponse.redirect('/login');
  }
}
```

---

## 📁 Feature-Driven Architecture

### Why Feature Folders?

Traditional approach (by type):
```
❌ Hard to scale
components/
├── PatientList.tsx
├── PatientForm.tsx
├── AssessmentList.tsx
└── AssessmentForm.tsx

hooks/
├── usePatients.ts
└── useAssessments.ts
```

Feature-driven approach:
```
✅ Easy to scale
features/
├── patients/
│   ├── components/
│   │   ├── PatientList.tsx
│   │   └── PatientForm.tsx
│   ├── hooks/
│   │   └── usePatients.ts
│   └── index.ts
├── assessments/
│   ├── components/
│   ├── hooks/
│   └── index.ts
```

**Benefits:**
- All patient code in one place
- Easy to find related files
- Can delete entire feature cleanly
- Team members can work on separate features

---

## 🎨 Component Design Patterns

### Composition Over Props

❌ **BAD: Too many props**

```typescript
<Card 
  title="Title"
  description="Description"
  footer={<Button />}
  headerAction={<Icon />}
  variant="primary"
/>
```

✅ **GOOD: Composition**

```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
  <CardFooter>
    <Button />
  </CardFooter>
</Card>
```

### Smart vs Presentational

```typescript
// Smart Component (has logic)
function PatientListContainer() {
  const { data, isLoading } = usePatients();
  
  return <PatientList patients={data} loading={isLoading} />;
}

// Presentational Component (just UI)
function PatientList({ patients, loading }) {
  return <div>{/* render */}</div>;
}
```

---

## 🔄 Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Hook (usePatients)
    ↓
Service (patientService)
    ↓
API Client (axios)
    ↓
Backend API
    ↓
Response
    ↓
React Query Cache
    ↓
Component Re-render
```

---

## 🚀 Performance Optimization

### Server vs Client Components

```typescript
// ✅ Server Component (default in App Router)
export default function Page() {
  // Rendered on server
  // No JavaScript sent to client
  return <div>Static content</div>;
}

// ✅ Client Component (when needed)
'use client';

export default function InteractivePage() {
  const [count, setCount] = useState(0);
  // Uses hooks, interactivity
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### When to Use Client Components

- Event handlers (onClick, onChange)
- Hooks (useState, useEffect)
- Browser APIs
- Interactivity

### React Query Optimization

```typescript
useQuery({
  queryKey: ['patients'],
  queryFn: patientService.getAll,
  staleTime: 5 * 60 * 1000,      // Consider fresh for 5 min
  cacheTime: 10 * 60 * 1000,     // Keep in cache for 10 min
  refetchOnWindowFocus: false,   // Don't refetch on tab switch
});
```

---

## 🛡️ Type Safety Strategy

### End-to-End Types

```typescript
// 1. API response type
interface PatientResponse {
  id: string;
  firstName: string;
  lastName: string;
}

// 2. Service method typed
export const patientService = {
  getById: async (id: string): Promise<Patient> => {
    return api.get<Patient>(`/patients/${id}`);
  },
};

// 3. Hook typed
export function usePatient(id: string) {
  return useQuery<Patient>({
    queryKey: ['patient', id],
    queryFn: () => patientService.getById(id),
  });
}

// 4. Component typed
function PatientDetail({ id }: { id: string }) {
  const { data: patient } = usePatient(id);
  // patient is typed as Patient | undefined
}
```

---

## 📋 Scalability Checklist

- [ ] Feature modules self-contained
- [ ] No cross-feature dependencies
- [ ] API calls centralized
- [ ] State properly layered
- [ ] Types defined and exported
- [ ] Components composable
- [ ] No business logic in components
- [ ] Proper error boundaries

---

## 🎓 Best Practices Summary

### DO ✅

- Centralize API calls in services
- Use React Query for server state
- Use Zustand for UI state only
- Type everything strictly
- Keep components presentational
- Use composition over props
- Follow folder structure

### DON'T ❌

- Call APIs directly in components
- Store server data in Zustand
- Mix server and UI state
- Use `any` type
- Create god components
- Duplicate logic
- Ignore TypeScript errors

---

**This architecture is designed for 5+ year evolution. Follow it strictly.**
