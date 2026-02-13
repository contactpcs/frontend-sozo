# Contributing Guidelines

## 👋 Welcome

Thank you for contributing to Sozo Healthcare Platform!

---

## 📋 Code of Conduct

- Be respectful and professional
- Follow established patterns
- Write clean, maintainable code
- Document your changes

---

## 🔧 Development Process

### 1. Setup Development Environment

See [SETUP.md](./SETUP.md) for detailed instructions.

### 2. Create Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Follow the [Architecture Guide](./ARCHITECTURE.md)
- Maintain code quality standards
- Write tests for new features

### 4. Run Quality Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Tests
npm test

# Format code
npm run format
```

### 5. Commit Changes

Use conventional commits:

```bash
git commit -m "feat: add patient export feature"
git commit -m "fix: resolve authentication issue"
git commit -m "docs: update API documentation"
```

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Create Pull Request on GitHub with:
- Clear description
- Screenshots (if UI changes)
- Link to related issues

---

## 📏 Code Standards

### TypeScript

```typescript
// ✅ Good
interface UserProps {
  id: string;
  name: string;
}

export function getUser(id: string): Promise<User> {
  return userService.getById(id);
}

// ❌ Bad
function getUser(id) {  // Missing types
  return fetch(`/api/users/${id}`);  // Direct API call
}
```

### Components

```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ Bad
export function Button(props: any) {  // Any type
  return <button>{props.children}</button>;
}
```

### Hooks

```typescript
// ✅ Good
export function usePatients(params?: PatientListParams) {
  return useQuery({
    queryKey: ['patients', params],
    queryFn: () => patientService.getAll(params),
  });
}

// ❌ Bad
export function usePatients() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/patients')  // Direct fetch
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return data;
}
```

---

## 🧪 Testing Standards

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePatients } from './usePatients';

describe('usePatients', () => {
  it('fetches patients successfully', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => usePatients(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});
```

---

## 📁 File Organization

### Adding New Feature

```bash
# 1. Create feature folder
mkdir -p src/features/new-feature

# 2. Add structure
src/features/new-feature/
├── components/
│   ├── FeatureComponent.tsx
│   └── index.ts
├── hooks/
│   ├── useFeature.ts
│   └── index.ts
├── types/
│   └── feature.types.ts
└── index.ts

# 3. Create page
src/app/(dashboard)/new-feature/
└── page.tsx
```

### Adding New Component

```bash
# UI Component
src/components/ui/NewComponent.tsx

# Layout Component
src/components/layout/NewLayout.tsx

# Feature Component
src/features/feature-name/components/NewComponent.tsx
```

---

## 🎨 UI/UX Guidelines

### Design System

- Use existing components from `components/ui/`
- Follow Tailwind CSS conventions
- Maintain consistent spacing (4px grid)
- Use theme colors from `tailwind.config.ts`

### Accessibility

```typescript
// ✅ Good
<button
  onClick={handleClick}
  aria-label="Close modal"
  type="button"
>
  <X aria-hidden="true" />
</button>

// ❌ Bad
<div onClick={handleClick}>  // Not keyboard accessible
  <X />
</div>
```

### Responsive Design

```typescript
// ✅ Good
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// ❌ Bad
<div className="grid grid-cols-3">  // Not responsive
  {items.map(item => <Card key={item.id} />)}
</div>
```

---

## 🔍 Code Review Checklist

### For Authors

Before submitting PR:

- [ ] Code follows TypeScript strict mode
- [ ] No console.logs or debugger statements
- [ ] No direct API calls in components
- [ ] Proper error handling implemented
- [ ] Types properly defined
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No ESLint warnings
- [ ] Code formatted with Prettier

### For Reviewers

When reviewing PR:

- [ ] Architecture principles followed
- [ ] Type safety maintained
- [ ] No prop drilling
- [ ] Proper state management
- [ ] Accessibility considered
- [ ] Performance optimized
- [ ] Security concerns addressed
- [ ] Tests cover new functionality

---

## 🚨 Common Mistakes to Avoid

### 1. Direct API Calls

```typescript
// ❌ Don't
function Component() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch('/api/data').then(setData);
  }, []);
}

// ✅ Do
function Component() {
  const { data } = useData();
}
```

### 2. Any Type

```typescript
// ❌ Don't
function process(data: any) {
  return data.map(item => item.id);
}

// ✅ Do
function process(data: Item[]) {
  return data.map(item => item.id);
}
```

### 3. Mixing State Layers

```typescript
// ❌ Don't
const useStore = create((set) => ({
  patients: [],  // Server data in Zustand
  setPatients: (patients) => set({ patients }),
}));

// ✅ Do
const { data: patients } = useQuery(['patients'], fetchPatients);
```

---

## 📚 Resources

- [Architecture Guide](./ARCHITECTURE.md)
- [Setup Guide](./SETUP.md)
- [README](./README.md)

---

## 💬 Getting Help

- Ask questions in team chat
- Create discussion in GitHub
- Review existing code for patterns
- Consult architecture documentation

---

**Thank you for contributing! 🙏**
