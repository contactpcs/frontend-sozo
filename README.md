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

# Sozo Healthcare Platform — Frontend

> Enterprise-grade Next.js healthcare SaaS platform built for scale, maintainability, and long-term evolution.

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

Sozo Healthcare Platform is a production-ready, enterprise-scale frontend application designed to support healthcare workflows for patients, clinicians, reviewers, and administrators.

### Key Features

- Role-Based Access Control (RBAC)
- Modular, feature-driven architecture
- Strict TypeScript and schema validation (Zod)
- Clear separation between UI, business logic and data
- React Query for server state and caching
- Zustand for global UI state
- Tailwind CSS for styling

---

## 🏗️ Architecture Philosophy

We follow enterprise-grade principles: separation of concerns, feature-driven structure, and type-safety. UI components are presentation-only, business logic lives in hooks/services, and a centralized API layer handles all HTTP communication.

---

## 🛠️ Technology Stack

- Next.js 14+ (App Router)
- React 18+
- TypeScript 5.x (strict)
- TanStack Query (React Query)
- Zustand (UI state)
- React Hook Form
- Tailwind CSS
- Zod, Axios, date-fns
- ESLint, Prettier

---

## 📁 Project Structure

High-level layout:

```
src/
├── app/                # Next.js App Router (routes & layouts)
├── features/           # Feature modules (components, hooks, types)
├── components/         # Shared UI components and layout
├── lib/                # API client, services, utils, validators
├── store/              # Zustand stores (UI state only)
├── styles/             # Global styles
└── types/              # Shared TypeScript types
```

Refer to the in-repo files for detailed organization.

---

## 🚀 Getting Started

Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0

Installation

```bash
git clone <repository-url>
cd "SOZO Frontend/SOZO-CRM" # or your cloned folder
npm install
cp .env.example .env
# Edit .env with your API URL and settings
```

Development

```bash
npm run dev
# Visit http://localhost:3000
```

Build & Production

```bash
npm run build
npm start
```

---

## 🔄 Development Workflow

Common commands:

```bash
npm run type-check
npm run lint
npm run lint:fix
npm run format
npm test
```

---

## 🗄️ State Management Strategy

We use a 3-layer state model:

1. Server state — React Query (API data, caching)
2. Global UI state — Zustand (sidebar, theme, modals, toasts)
3. Local component state — useState for ephemeral UI

Keep API data out of global UI stores.

---

## 🌐 API Layer Architecture

All API calls go through `lib/api/` (Axios instance + services). Use service methods in hooks and components should consume hooks (React Query) rather than calling Axios directly.

Example service pattern:

```ts
export const patientService = {
  getAll: (params) => api.get('/patients', { params }),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.patch(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
};
```

---

## 🔐 Authentication & Security

- Tokens: prefer httpOnly cookies for JWTs
- Automatic refresh via Axios interceptors
- Route protection implemented in `middleware.ts`

---

## 📂 Folder Organization

Features are self-contained under `features/<name>/` with `components/`, `hooks/`, and `types/`. Follow the existing pattern when adding new features.

---

## 📏 Code Standards

- TypeScript strict mode enabled
- Explicit return types for public functions
- Components: `PascalCase.tsx`
- Hooks: `useXxx.ts`
- Keep components presentational; put logic in hooks/services

---

## 🐳 Deployment

Example Docker workflow:

```bash
docker build -t sozo-frontend .
docker run -p 3000:3000 sozo-frontend
```

Production checklist: envs configured, endpoints verified, monitoring enabled.

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Follow code standards and tests
3. Submit PR with clear description and linked issues

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

Built with ❤️ for enterprise healthcare
