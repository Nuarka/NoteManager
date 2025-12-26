# ProjectMind

## Overview

ProjectMind is a colorful, intuitive workspace application for organizing notes, projects, tasks, and mind maps. It provides a dashboard-centric experience where users can manage their thoughts and projects in one place. The application features a rich text editor, interactive mind maps, AI-powered chat, and a todo management system.

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
- **Data Fetching**: TanStack React Query for API communication
- **Markdown Rendering**: React Markdown with remark-gfm for chat responses

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **Development**: tsx for TypeScript execution during development
- **AI Integration**: Groq SDK for chat completions

### Data Storage
- **Database**: PostgreSQL via Neon serverless driver
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit configured for PostgreSQL migrations (`npm run db:push`)

### Database Schema
- **users**: Basic user authentication (id, username, password)
- **conversations**: Chat conversation metadata (id, title, createdAt)
- **messages**: Individual chat messages (id, conversationId, role, content, createdAt)

### Project Structure
```
client/               # Frontend React application
├── src/
│   ├── components/   # UI components (layout, editor, maps, dashboard)
│   ├── pages/        # Route pages (Home, Notes, Maps, Projects, Chat, About)
│   ├── lib/          # Utilities, store, types, queryClient
│   └── hooks/        # Custom React hooks
server/               # Express backend
├── index.ts          # Server entry point
├── routes.ts         # API route registration
├── storage.ts        # In-memory storage interface
├── static.ts         # Static file serving for production
├── vite.ts           # Vite dev server integration
├── db/index.ts       # Database connection setup
└── replit_integrations/
    ├── chat/         # AI chat routes and storage
    └── batch/        # Batch processing utilities for AI
shared/               # Shared code between client/server
└── schema.ts         # Drizzle database schema
```

### Key Design Patterns
- **Monorepo Structure**: Client and server share TypeScript types through the `shared/` directory
- **Path Aliases**: Uses `@/` for client imports and `@shared/` for shared code
- **API Convention**: All backend routes prefixed with `/api`
- **Hybrid Storage**: Database for chat persistence, Zustand store for notes/projects/todos

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database via `@neondatabase/serverless`
- **Connection**: Configured through `DATABASE_URL` environment variable

### AI Services
- **Groq**: AI chat completions via `groq-sdk`
- **API Key**: Configured through `GROQ_API_KEY` environment variable

### Third-Party UI Libraries
- **Radix UI**: Complete set of accessible UI primitives
- **Recharts**: Data visualization for dashboard charts
- **React Flow**: Interactive node-based mind map diagrams
- **Tiptap**: Rich text editor with extensible architecture
- **Vaul**: Drawer component for mobile interfaces
- **CMDK**: Command palette component
- **Embla Carousel**: Carousel/slider component

### Build & Development Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **Drizzle Kit**: Database migration tooling