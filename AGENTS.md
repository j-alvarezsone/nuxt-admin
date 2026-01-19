# AGENTS.md - Development Guidelines for Nuxt Admin Project

This document provides comprehensive guidelines for agentic coding assistants working on the Nuxt Admin project. Follow these conventions to maintain code quality and consistency.

## Project Overview

This is a Nuxt 4 application with TypeScript, built as a service store with admin dashboard functionality. It uses Prisma with PostgreSQL, Tailwind CSS, and @nuxt/ui components.

## Build, Lint, and Test Commands

### Development Commands
```bash
# Start development server (includes Prisma migration)
pnpm dev

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview

# Run database seeding
pnpm seed
```

### Linting and Code Quality
```bash
# Run ESLint (integrated with Nuxt)
pnpm lint

# Type checking (integrated with Nuxt build)
pnpm build
```

### Testing Commands
**Note:** No testing framework is currently configured. When adding tests:

```bash
# Recommended: Add Vitest for unit/component testing
pnpm add -D vitest @vue/test-utils jsdom

# Add to package.json scripts:
"test": "vitest",
"test:run": "vitest run",
"test:ui": "vitest --ui"

# Run single test file (once Vitest is set up)
pnpm test path/to/test.spec.ts

# Run tests in watch mode
pnpm test -- --watch
```

## Code Style Guidelines

### TypeScript Configuration

#### Type Definitions
- Use explicit TypeScript interfaces for complex objects
- Place types in `shared/types/` directory
- Use PascalCase for interface names
- Prefer `type` over `interface` for simple unions

```typescript
// shared/types/product.ts
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
}
```

#### Function Signatures
- Use regular function declarations for top-level functions (better for hoisting)
- Use arrow functions for inline/one-liner functions
- Explicit return types for public functions
- Default parameters with sensible values
- **Always add JSDoc comments for utility functions and composables**

```typescript
// Top-level function: use regular function declaration with JSDoc
/**
 * Formats a number as currency using Intl.NumberFormat
 * @param amount - The amount to format
 * @param locale - The locale to use (default: 'en-US')
 * @param currency - The currency code (default: 'EUR')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  locale = 'en-US',
  currency = 'EUR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

// Inline/one-liner: use arrow function
const double = (n: number) => n * 2;
```

### Vue Components

#### Component Structure
- Use `<script setup lang="ts">` syntax
- Order: script, template, style
- Use PascalCase for component file names
- Use kebab-case for component tags in templates

```vue
<script setup lang="ts">
defineProps<{
  product: Product;
}>();
</script>

<template>
  <UCard class="w-full">
    <!-- component content -->
  </UCard>
</template>
```

#### Props and Emits
- Use `defineProps<T>()` with TypeScript interfaces
- Define emits explicitly when needed
- Use descriptive prop names

```vue
<script setup lang="ts">
const props = defineProps<{
  products: Product[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  select: [product: Product];
}>();
</script>
```

### Naming Conventions

#### Files and Directories
- `PascalCase` for Vue components: `ProductCard.vue`
- `kebab-case` for utilities: `format-currency.ts`
- `kebab-case` for page routes: `product/[slug].vue`
- Group related components in directories: `components/product/`

#### Variables and Functions
- `camelCase` for variables and functions
- `PascalCase` for types and interfaces
- `SCREAMING_SNAKE_CASE` for constants
- Prefix reactive refs with descriptive names

```typescript
const products = ref<Product[]>([]);
const isLoading = ref(false);
const ITEMS_PER_PAGE = 10;
```

### Import Organization

#### Auto-imports
- Nuxt uses auto-imports - **most imports are not needed**
- Vue composables (ref, computed, watch, etc.) are auto-imported
- Nuxt composables (useState, useFetch, navigateTo, etc.) are auto-imported
- Components are auto-imported from `~/components`
- Only import manually in rare cases (third-party libraries, explicit utilities)
- Use `~/` prefix for absolute imports when manual import is needed

#### Import Order (when manual imports are needed)
1. Third-party libraries
2. Local utilities and types
3. Explicit component imports (rarely needed)

```vue
<script setup lang="ts">
// Most Vue/Nuxt imports are auto-imported, no need to import ref, computed, etc.
// Only import what's not auto-imported
import type { Product } from '~/shared/types/product';
import { formatCurrency } from '~/shared/utils/format-currency';
</script>
```

### Error Handling

#### Client-side Error Handling
- Use try-catch for async operations
- Provide user-friendly error messages
- Log errors appropriately (warn/error only per ESLint rules)

```typescript
try {
  await fetchProducts();
} catch (error) {
  console.error('Failed to fetch products:', error);
  // Show user notification
}
```

#### Server-side Error Handling
- Use Nitro's error handling utilities
- Throw appropriate HTTP status codes
- Log server errors securely

### Database and Prisma

#### Schema Conventions
- Use PascalCase for model names
- Use camelCase for field names
- Include appropriate constraints and defaults
- Document relationships clearly

```prisma
model SiteReview {
  id          Int      @id @default(autoincrement())
  name        String
  subtitle    String
  description String
  createdAt   DateTime @default(now())
}
```

#### Database Utilities
- Use singleton pattern for Prisma client
- Handle connection pooling properly
- Include proper error handling

```typescript
// server/utils/db.ts
const prismaClientSingleton = () => {
  const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter: pool });
};
```

### Styling Guidelines

#### Tailwind CSS
- Use utility-first approach
- Leverage @nuxt/ui component variants
- Maintain consistent spacing scale
- Use responsive prefixes appropriately

```vue
<template>
  <UCard class="w-full px-4 py-6 md:px-6">
    <h3 class="text-lg font-bold text-gray-900">
      {{ product.name }}
    </h3>
  </UCard>
</template>
```

#### CSS Organization
- Place global styles in `assets/css/main.css`
- Use scoped styles for component-specific styling
- Avoid inline styles except for dynamic values

### File Structure

```
├── app/
│   ├── components/
│   │   ├── shared/          # Reusable components
│   │   ├── product/         # Product-related components
│   │   └── dashboard/       # Admin components
│   ├── layouts/             # Page layouts
│   ├── pages/               # Route pages
│   └── utils/               # Client-side utilities
├── server/
│   ├── api/                 # API routes
│   └── utils/               # Server utilities
├── shared/
│   ├── types/               # TypeScript definitions
│   └── utils/               # Shared utilities
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seeds/               # Database seeds
└── public/                  # Static assets
```

### Performance Considerations

#### Vue Best Practices
- Use `shallowRef` for large objects when possible
- Implement proper key attributes in v-for loops
- Use computed properties for expensive calculations
- Leverage Nuxt's built-in optimizations

#### Image Optimization
- Use @nuxt/image for responsive images
- Implement lazy loading for image galleries
- Optimize image formats and sizes

### Security Guidelines

#### Environment Variables
- Never commit sensitive data
- Use runtime config for client-safe variables
- Validate environment variables on startup

#### API Security
- Implement proper input validation with Zod
- Use appropriate authentication/authorization
- Sanitize user inputs
- Rate limiting for public endpoints

### Git Workflow

#### Commit Messages
- Use conventional commits format
- Be descriptive but concise
- Reference issues when applicable

```bash
feat: add product filtering functionality
fix: resolve pagination bug in products grid
docs: update API documentation
```

#### Branch Naming
- Use descriptive branch names
- Follow pattern: `feature/description` or `fix/issue-number-description`

### ESLint Rules Compliance

#### Enforced Rules
- No console.log (only console.warn and console.error allowed)
- Vue block order: script, template, style
- No multiple empty lines (max 1)
- No trailing spaces

#### Code Formatting
- ESLint handles most formatting
- Use Prettier-compatible formatting
- Consistent indentation (2 spaces)

### Deployment and Environment

#### Environment Configuration
- Use `.env` files for local development
- Configure runtime config in `nuxt.config.ts`
- Document required environment variables

#### Build Optimization
- Configure prerendering for static routes
- Exclude dynamic routes from prerendering
- Optimize bundle size with code splitting

This document should be updated as the project evolves and new patterns emerge. Always check the latest version before making changes.