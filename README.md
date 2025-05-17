# 🚀 Next.js Custom Template – Newus Boilerplate

Welcome to the **Next.js** based project with internal customization from the Newus Technology team. This template uses the `pr-template-nextjs` boilerplate as the main foundation, developed to accelerate the development of modern, fast and scalable web applications.

---

## Project Structure

```
src/
├── __tests__/                    # Unit Testing
├── app/                          # Page and Layout
├── assets/                       # Static files (images, fonts)
├── components/                   # Reusable UI components
│   ├── parts/                    # Parts of Component
│   │   └──[folder-name]
│   │        │──api.ts
│   │        │──interface.d.ts
│   │        └──validation.ts
│   ├── sections/                 # Sections of Component
│   ├── shared/                   # Global component
│   └── ui/                       # Component form ShadCN/UI
├── constants/                    # Constants value or objects
├── hooks/                        # Custom React hooks
├── libs/                         # Helper functions and constants
├── services/                     # API calls and external services
│   └── api/
│       └── fetcher.ts
├── store/             # State management
└── types/             # Global TypeScript type definitions
```

---

## Teknologi dan Library

- **Framework**: Next.js (App Router / Pages Router)
- **Styling**: Tailwind CSS + Custom Theme
- **State Management**: React Context / Zustand
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: fetch bawaan dengan custom fetching
- **UI Component**: shadcn/ui (Headless UI + Radix UI)
- **Icon Library**: lucide-react
- **Linting**: ESLint, Prettier, Husky
- **CI/CD Ready**: GitHub Actions
- **Deployment**: VPS

---

## Commit Message Guidelines

Follow these conventions for clear and meaningful commit messages [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) :

- **Format:** type(scope): description
- **Types:**
  - feat: new feature
  - fix: bug fix
  - docs: documentation changes
  - style: formatting, missing semicolons, etc.
  - refactor: code restructuring
  - test: adding tests
  - chore: maintenance tasks

Example: `feat(auth): implement OAuth2 login system`

---

## Naming Conventions

### Components

- Use PascalCase for component files and names: `UserProfile.tsx`
- Use .tsx extension for TypeScript components
- Keep one component per file

### Files and Folders

- Use kebab-case for folders: `user-profile/`
- Use camelCase for utility files: `formatDate.ts`
- Use index.ts for barrel exports

### **Variable & Function**

- Use camelCase for variables and functions: userData, fetchUserData()
- Use UPPER_CASE for constants and environment variables: API_URL, MAX_LIMIT
- Boolean variables must be preceded by a verb: isLoading, hasError, shouldFetch

### Object & API Mockup

- Use camelCase for object properties: `userName`, `userEmail`
- Use meaningful and descriptive property names: `userId` instead of `id`
- Mock API responses should mimic real-world data structures
- Example of an API mockup:

```json
{
  "userId": 123,
  "userName": "John Doe",
  "userEmail": "john.doe@example.com",
  "isActive": true
}
```

### **Type & Interface**

- Use PascalCase for types and interfaces: `UserProfile`, `AuthResponse`
- Prefix interfaces with `I`: `IUser`, `IItem`
- Use meaningful and descriptive names for types and interfaces
- Example of a well-defined interface:

```tsx
interface IUser {
  userId: number;
  userName: string;
  userEmail: string;
  isActive: boolean;
}

type UserResponse = {
  data: IUser;
  status: string;
};
```

---

## Code Style Guidelines

### General Rules

- Use consistent indentation (2 spaces recommended)
- Add semicolons at the end of statements
- Use double quotes for strings
- Always use type annotations in TypeScript

### React Specific

- Use functional components with hooks
- Destructure props in component parameters
- Keep components small and focused
- Use meaningful prop names
- Avoid using any, use data types that are compatible with TypeScript

---

## Contribution Guide

Please select your preferred language:

- 🇮🇩 [Panduan Kontribusi Bahasa Indonesia](./CONTRIBUTING_ID.md)
- 🇬🇧 [Contribution Guide in English](./CONTRIBUTING.md)

## Best Practices

- Write unit tests for components and utilities //if timeline is enough, if not can skip this unit test
- Document complex logic with comments
- Examples of good code comments:

```tsx
// Bad comment
// This function gets user data
const getUserData = async (id: string) => {...}

// Good comment
/**
 * Fetches user profile data from the API
 * @param id - The unique identifier of the user
 * @returns UserProfile object containing user details
 * @throws ApiError if user not found or network fails
 */
const getUserData = async (id: string): Promise<UserProfile> => {...}
*/
```

- Use environment variables for configuration
- Example of environment variables configuration:

```tsx
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
AUTH_SECRET=your-secret-key

// Using environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// Validate environment variables
if (!process.env.AUTH_SECRET) {
  throw new Error('AUTH_SECRET environment variable is required');
}

// Type-safe environment variables
const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  gaId: process.env.NEXT_PUBLIC_GA_ID as string,
  authSecret: process.env.AUTH_SECRET as string,
};
```

- Optimize images and assets
- Implement proper error handling
- Use code-splitting for better performance
- Example of code-splitting implementation:

```tsx
// Without code-splitting
import HeavyComponent from "./HeavyComponent";

// With code-splitting
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

// Route-based code-splitting
const ProductPage = dynamic(() => import("./pages/Product"), {
  loading: () => <LoadingSpinner />,
});

// Component-based code-splitting with React.lazy
const HeavyChart = React.lazy(() => import("./components/HeavyChart"));
return (
  <Suspense fallback={<LoadingSpinner />}>
    <HeavyChart />
  </Suspense>
);
```

- Use Zustand for global state management
- Always use the English language for naming convention
- General rendering strategy selection guidelines:
  - Use SSR when you need real-time data and SEO
  - Use SSG for static content that rarely changes
  - Use ISR for content that changes occasionally but needs good performance
  - Use CSR for highly interactive features or private pages
  - Consider mixing strategies based on specific page sections' needs

## Version Control

- Create feature branches from the dev
- Branch naming conventions:
  - `feature/add-payment-gateway` - for new features
  - `fix/login-validation` - for bug fixes
  - `hotfix/security-patch` - for urgent fixes
  - `refactor/auth-module` - for code refactoring
  - `docs/api-documentation` - for documentation updates
  - `test/user-authentication` - for test-related changes
- Always include ticket number if available: `feature/ABC-123-user-profile`
- Use hyphens to separate words: `feature/add-google-analytics` not `feature/addGoogleAnalytics`
- Regularly pull from the dev branch

---

## How to Run a Project

### 1. Repositori Clone

```bash
git clone git@github.com:NewusTech/maincore-fe.git
# or
git clone https://github.com/NewusTech/maincore-fe.git
cd nama-repo
```

### 2. Dependency Install

```bash
pnpm install
```

### 3. Make FIle `.env`

```bash
cp .env.example .env
```

Fill in the configuration according to your environment (see `.env` section below).

### 4. Running in Local

```bash
pnpm dev
```

Accses your aplication on : [http://localhost:3000](http://localhost:3000)

---

## Credits

This template is setup by collaboration [@aldngrha](https://github.com/aldngrha/) and [@sakatimuna7](https://github.com/sakatimuna7/)

---

## Contact

📧 Email: newustechnology@gmail.com  
🌐 Website: [newus.id](https://newus.id/)

---

> Created with ❤️ by Team Newus Teknologi
