# Development Setup Guide

## 🚀 Quick Start

### Prerequisites Installation

#### 1. Install Node.js

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Verify installation
node --version  # Should be >= 18.17.0
npm --version   # Should be >= 9.0.0
```

#### 2. Clone Repository

```bash
git clone <repository-url>
cd sozo-healthcare-platform
```

#### 3. Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Configuration

### 1. Create Environment File

```bash
cp .env.example .env
```

### 2. Configure Variables

Edit `.env`:

```env
# Required Variables
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Sozo Healthcare Platform

# Optional Variables
NEXT_PUBLIC_ENABLE_DEBUG=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

---

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Application will be available at: `http://localhost:3000`

### Production Build

```bash
# Build
npm run build

# Start production server
npm start
```

---

## 🧪 Testing Setup

### Run Tests

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## 🔧 Development Tools

### VS Code Extensions (Recommended)

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 🐛 Debugging

### VS Code Debugger

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

---

## 📦 Package Management

### Adding New Dependencies

```bash
# Production dependency
npm install <package-name>

# Development dependency
npm install -D <package-name>
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm update <package-name>
```

---

## 🎨 Code Quality

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Formatting

```bash
# Check formatting
npm run format:check

# Format all files
npm run format
```

### Type Checking

```bash
npm run type-check
```

---

## 🔄 Git Workflow

### Branch Naming

```bash
feature/patient-list
bugfix/auth-token-refresh
hotfix/critical-security-issue
```

### Commit Messages

Follow conventional commits:

```bash
feat: add patient creation form
fix: resolve token refresh issue
docs: update API documentation
style: format code with prettier
refactor: restructure patient service
test: add patient hook tests
chore: update dependencies
```

---

## 🐳 Docker Development

### Build Image

```bash
docker build -t sozo-frontend .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://api:8000 \
  sozo-frontend
```

### Docker Compose

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f frontend
```

---

## 🔐 Backend Integration

### Mock API Server (Development)

If backend is not ready, use mock API:

```bash
# Install json-server
npm install -g json-server

# Create mock data
echo '{"patients": [], "assessments": []}' > db.json

# Start mock server
json-server --watch db.json --port 8000
```

### Configure Proxy

Update `next.config.js`:

```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8000/api/:path*',
    },
  ];
}
```

---

## 📊 Performance Monitoring

### Bundle Analysis

```bash
# Install analyzer
npm install -D @next/bundle-analyzer

# Run build with analysis
ANALYZE=true npm run build
```

### Lighthouse Testing

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

---

## 🚨 Troubleshooting

### Clear Cache

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm run dev` starts successfully
- [ ] Application loads at `http://localhost:3000`
- [ ] TypeScript errors: none
- [ ] ESLint errors: none
- [ ] Login page renders correctly
- [ ] Dashboard redirects properly
- [ ] Hot reload works
- [ ] Environment variables loaded

---

**Happy coding! 🎉**
