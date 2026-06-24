# Mobile Store

A Next.js product catalog and cart application built for the Zara frontend technical test.

## Features

- Product catalog with search
- Product detail page
- Storage and color selection
- Persistent cart
- Responsive layout
- Route loading states
- Error states
- Route-level error boundaries
- Custom horizontal scroll for similar products
- Unit tests with Vitest and Testing Library

## Tech Stack

- Next.js
- React
- TypeScript
- Plain CSS files colocated with components
- Vitest
- Testing Library
- Stylelint
- Prettier

## How to Run

### Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

### Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm test
pnpm lint
pnpm stylelint
pnpm format:check
```

### Production URL

https://zara-test-isayenko.vercel.app/

### Deployment

The app is deployed automatically to Vercel when changes are pushed to the `main` branch.

## Development

### Why Next.js

Next.js was chosen because it provides a React-based architecture with built-in routing and Server components. This fits the challenge well because product catalog and detail data can be fetched on the server, while route-based views such as catalog, product detail, cart, loading states, and error boundaries are handled directly by the framework.

### Fetching

This application uses Server components to fetch product data from the API. This is useful because it allows the data to be fetched on the server side, which can improve performance and SEO.

The initial catalog and product detail data are fetched with Server components. The search input performs client-side API requests because it depends on user interaction. Search requests are debounced to avoid calling the API on every keystroke.

During the fetching, the app also reflects the loading state to the user. It uses server components to initialize the fetching process and display a loading indicator while waiting for the data to be fetched.

If during the fetching process an error occurs, the app displays an error state to the user.

The cart state is handled with React Context and persisted in `localStorage`, so selected products remain available after refreshing the page.

### Project Structure

The project is structured as follows:

```
src/
├── app/
│   ├── (catalog)/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── product/[id]/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── ...
├── components/
│   ├── product-catalog/
│   │   ├── product-catalog.tsx
│   │   ├── product-catalog.test.tsx
│   │   ├── product-catalog.css
│   │   └── ...
│   ├── product-detail/
│   │   ├── product-detail.tsx
│   │   ├── product-detail.test.tsx
│   │   ├── product-detail.css
│   │   └── ...
│   └── ...
├── hooks/
│   ├── use-debounce.ts
│   └── ...
├── context/
│   ├── cart-context.tsx
│   └── ...
├── services/
│   ├── products.ts
│   └── ...
└── ...
```

### Naming Convention

- For the files, use kebab-case, e.g. `use-cart.ts`.
- For types add `.types.ts` suffix, e.g. `use-cart.types.ts`.
- For tests add `.test.ts` or `.test.tsx` suffix, e.g. `button.test.tsx`.

### Testing

- Use Vitest for testing.
- Use React Testing Library for testing React components.

### Styling

- Global styles are defined in `globals.css`.
- Component-specific styles are colocated with each component as plain CSS files.
- Use variables from `globals.css` for styling.
