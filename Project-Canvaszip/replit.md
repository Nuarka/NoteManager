# ProjectMind

## Overview

ProjectMind is a colorful, intuitive workspace application for organizing notes, projects, tasks, and mind maps. It provides a dashboard-centric experience where users can manage their thoughts and projects in one cohesive interface. The application features a rich text editor, interactive mind maps, and a todo management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: Zustand for client-side state with mock data
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: Shadcn/ui component library (New York style) with Radix UI primitives
- **Rich Text Editor**: Tiptap with extensions for images and links
- **Mind Maps**: React Flow for interactive node-based diagrams
- **Charts**: Recharts for data visualization in the dashboard
- **Data Fetching**: TanStack React Query (configured but primarily using local Zustand store)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **Development**: tsx for TypeScript execution during development

### Data Storage
- **Database Schema**: PostgreSQL via Drizzle ORM (schema defined but using in-memory storage)
- **Current Storage**: MemStorage class with in-memory Maps for development
- **Schema Location**: `shared/schema.ts` contains user table definitions
- **Migrations**: Drizzle Kit configured for PostgreSQL migrations

### Project Structure
```
client/           # Frontend React application
├── src/
│   ├── components/   # UI components (layout, editor, maps, dashboard)
│   ├── pages/        # Route pages (Home, Notes, Maps, Projects)
│   ├── lib/          # Utilities, store, types
│   └── hooks/        # Custom React hooks
server/           # Express backend
├── routes.ts     # API route definitions
├── storage.ts    # Data storage interface
└── static.ts     # Static file serving
shared/           # Shared code between client/server
└── schema.ts     # Drizzle database schema
```

### Key Design Patterns
- **Interface-based Storage**: IStorage interface allows swapping between MemStorage and database implementations
- **Component Composition**: Shadcn/ui pattern with composable, accessible components
- **Centralized State**: Zustand store manages notes, projects, todos, and search state
- **Type Safety**: Drizzle-zod for schema validation, TypeScript throughout

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database queries and migrations

### UI Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, dropdown, popover, etc.)
- **Lucide React**: Icon library
- **React Day Picker**: Calendar component
- **Embla Carousel**: Carousel functionality
- **Vaul**: Drawer component

### Development Tools
- **Vite**: Development server with HMR
- **Replit Plugins**: Cartographer, dev banner, runtime error overlay for Replit environment

### Fonts
- **Open Sans**: Primary font (Google Fonts)
- **Inter**: Secondary UI font