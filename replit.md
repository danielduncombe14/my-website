# Portfolio Website

## Overview

This is a personal portfolio website built as a full-stack TypeScript application. It showcases a multi-page personal website featuring separate personal and business blogs, a credentials/education section, and a photo gallery. The application uses a modern tech stack with React on the frontend, Express on the backend, and is designed to display curated content across different sections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing (SPA architecture)
- Vite as the build tool and development server

**UI Component System**
- shadcn/ui components (New York style) providing a comprehensive set of pre-built, accessible UI primitives
- Radix UI primitives as the foundation for complex interactive components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for managing component variants
- Custom theming system supporting light/dark modes with CSS variables

**Design System**
- Typography: Inter font family (multiple weights) for headings/body, JetBrains Mono for code
- Content-first design approach inspired by Linear, Medium, and Notion
- Consistent spacing system using Tailwind's spacing scale
- Custom color palette defined via CSS custom properties
- Responsive breakpoints and mobile-first design patterns

**State Management**
- TanStack Query (React Query) for server state management, caching, and data fetching
- Local component state using React hooks
- No global state management library (simple application scope)

**Data Fetching Strategy**
- RESTful API calls to Express backend
- Centralized query client configuration with custom fetch wrapper
- Automatic request/response handling with error boundaries
- Optimistic UI updates disabled (staleTime: Infinity)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for type-safe API development
- ESM modules for modern JavaScript module system
- HTTP server created using Node's native http module

**API Design**
- RESTful endpoints organized by resource type (blog posts, credentials, gallery items)
- Type validation using Zod schemas derived from Drizzle ORM models
- Separate endpoints for personal vs business blog content

**Storage Layer**
- In-memory storage implementation (MemStorage class) for development/demo
- Interface-based design (IStorage) allows easy swapping to database implementations
- Pre-seeded sample data for all content types
- Database schema defined with Drizzle ORM (PostgreSQL dialect)

**Middleware Pipeline**
- JSON body parsing with raw body preservation for webhook support
- URL-encoded form data parsing
- Custom request logging middleware for API routes
- Vite middleware integration for development hot-reloading

### Database Architecture

**ORM & Schema**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the target database (Neon serverless ready)
- Schema-first design with Zod validation integration

**Data Models**
- **Blog Posts**: Title, excerpt, content, featured image, category, type (personal/business), date, read time, author, tags
- **Credentials**: Type (education/certification/award), title, organization, date, description, logo
- **Gallery Items**: Title, description, image URL, category

**Migration Strategy**
- Drizzle Kit for schema migrations
- Migration files stored in `/migrations` directory
- Push-based deployment for rapid development

### Build & Deployment

**Development**
- Concurrent frontend (Vite) and backend (tsx) development servers
- Hot module replacement for instant feedback
- TypeScript type checking separate from build process

**Production Build**
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Platform-neutral bundling with external package resolution
- ESM output format for modern Node.js runtimes

**TypeScript Configuration**
- Strict mode enabled for maximum type safety
- Path aliases for clean imports (@/, @shared/, @assets/)
- Incremental compilation for faster rebuilds
- Separate includes for client, server, and shared code

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: react, react-dom, @tanstack/react-query
- **Backend**: express, drizzle-orm, @neondatabase/serverless
- **Build Tools**: vite, esbuild, tsx (TypeScript execution)
- **Routing**: wouter (lightweight React router)

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled component primitives (~20 packages)
- **shadcn/ui**: Pre-configured component system built on Radix UI
- **Styling**: tailwindcss, postcss, autoprefixer, tailwind-merge, clsx
- **Icons**: lucide-react
- **Utilities**: class-variance-authority, cmdk (command palette)

### Form & Validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Validation resolver utilities
- **zod**: Runtime type validation
- **drizzle-zod**: Zod schema generation from Drizzle models

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for Replit
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development mode indicator

### Utility Libraries
- **date-fns**: Date formatting and manipulation
- **embla-carousel-react**: Carousel/slider component
- **nanoid**: Unique ID generation
- **vaul**: Drawer component primitive

### Session & Storage
- **connect-pg-simple**: PostgreSQL session store for Express (configured but not actively used)

### Database
- **Drizzle Stack**: drizzle-orm, drizzle-kit, drizzle-zod
- **Neon**: @neondatabase/serverless (PostgreSQL serverless driver)
- **Note**: Database integration is configured but application currently uses in-memory storage

### Potential Integration Points
- PostgreSQL database (schema ready, needs connection configuration)
- Session management (middleware configured but unused)
- File upload system (no current implementation)
- Authentication system (no current implementation)