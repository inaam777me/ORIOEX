
# ORIOEX System Architecture

## 1. Overview
The ORIOEX system is designed as a **Monorepo** using **Turborepo** or **Nx**. This allows shared types between the Next.js frontend and NestJS backend.

## 2. Technical Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, React Hook Form.
- **Backend**: NestJS, Prisma ORM, PostgreSQL.
- **AI Layer**: Gemini 3 Flash for real-time lead qualification.
- **Infrastructure**: Vercel (Frontend), AWS ECS/Fargate (Backend), RDS (PostgreSQL).

## 3. Installation & Setup

### Core Frontend Packages
```bash
npm install @google/genai react react-dom react-router-dom
npm install -D tailwindcss postcss autoprefixer typescript vite @types/react @types/react-dom
```

### Backend Foundation
```bash
npm install @nestjs/common @nestjs/core @nestjs/throttler @prisma/client class-validator class-transformer
npm install -D prisma @nestjs/cli
```

## 4. SEO & Performance Strategy
- **SSR**: The landing page uses Server-Side Rendering for critical SEO tags.
- **JSON-LD**: Structured data is injected into the head for "Organization" and "Service" schemas.
- **Images**: Next/Image for WebP conversion and lazy loading.
- **Edge Functions**: Analytics tracking and localized content served from the edge.

## 5. Lead Scoring Logic
When a POST `/leads` is received:
1. Data is validated (Class-Validator).
2. Lead is saved to DB with `Status.NEW`.
3. Background job (BullMQ or NestJS Events) triggers Gemini analysis.
4. Gemini analyzes the `message` and `company` to assign a `score` (0-100).
5. Priority is updated, and if `score > 80`, a notification is sent to Slack/Email.

## 6. Security (OWASP)
- **Rate Limiting**: Throttler module prevents spam on lead forms.
- **Sanitization**: Input sanitization to prevent XSS.
- **CORS**: Strict whitelist of origins.
- **Environment**: Secrets managed via AWS Secrets Manager / Vercel Env Vars.

## 7. Future Expansion
- **SaaS Portal**: A `/dashboard` route for authenticated customers.
- **Billing**: Integration with Stripe Billing via webhook listeners in a dedicated `BillingModule`.
- **API Access**: Versioned REST API (`/api/v1`) for external integrations.
