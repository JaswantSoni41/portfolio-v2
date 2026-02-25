
---

# `portfolio-ai-build-prompt.md`

```md
# Hybrid Modern Developer Portfolio (Next.js + TypeScript)

## Role

You are a senior full-stack engineer and UI/UX designer.

Your task is to build a **production-ready, modern developer portfolio website** for a Frontend / React Developer with MERN stack experience.

The portfolio must balance:

- Recruiter-friendly clarity
- Modern animations and transitions
- Clean product-level UI

---

## Tech Stack (TypeScript Required)

Use:

- Next.js (App Router)
- React with TypeScript (TSX)
- Tailwind CSS (v4)
- Framer Motion (animations)
- shadcn/ui components
- MongoDB + Mongoose (TypeScript models)
- Next.js Route Handlers (API)
- JWT authentication for admin panel

**Important:**
Avoid complex TypeScript generics unless absolutely necessary. Prefer clear interfaces.

---

## Project Initialization

Initialize with:

```

npx create-next-app@latest portfolio --typescript

````

Enable strict mode.

Create reusable type definitions in `/types`.

---

## Type Definitions Example

```ts
// /types/project.ts

export interface Project {
  _id?: string
  title: string
  description: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  images?: string[]
  videoUrl?: string
  featured?: boolean
  createdAt?: Date
}
````

---

## Design Style

Design must feel:

* Modern SaaS quality
* Clean and professional
* Dark theme with accent blue (#2563EB)
* Smooth transitions
* Subtle micro-interactions

Include:

* Scroll reveal animations
* Hover effects
* Animated navbar
* Section entrance animations

Performance must remain high (Lighthouse 90+).

---

## Website Sections

### Hero

Include:

* Name: Jaswant Soni
* Title: Frontend / React Developer | MERN Stack | EdTech
* CTA Buttons:

  * View Projects
  * Download Resume
  * Contact

Animated entry using Framer Motion.

---

### About

* Experience summary
* EdTech product experience
* Timeline animation

---

### Skills

Group skills into:

* Frontend
* Backend
* Databases
* Tools

Display animated skill cards.

---

### Projects (Dynamic)

Load projects dynamically from database.

Each project includes:

* Title
* Description
* Tech stack
* Live URL
* GitHub URL
* Images (optional)
* Video (optional)

Add:

* Filter by technology
* Modal view
* Animated hover states

---

### Experience

Timeline UI with animation.

---

### Contact

Form fields:

* Name
* Email
* Message

Store in database and optionally send email.

---

## Admin Panel (Protected)

Route: `/admin`

Features:

* Login authentication (JWT)
* Add project
* Edit project
* Delete project
* Upload images/video (optional)
* Toggle featured projects

Use typed forms:

```ts
const form = useForm<Project>()
```

---

## MongoDB Model (TypeScript)

```ts
import mongoose, { Schema, model, models } from "mongoose"
import { Project } from "@/types/project"

const ProjectSchema = new Schema<Project>({
  title: String,
  description: String,
  techStack: [String],
  liveUrl: String,
  githubUrl: String,
  images: [String],
  videoUrl: String,
  featured: Boolean,
  createdAt: { type: Date, default: Date.now }
})

export default models.Project || model<Project>("Project", ProjectSchema)
```

---

## Animations

Use Framer Motion for:

* Page transitions
* Section reveal
* Navbar animation
* Hover effects
* Skeleton loaders

Animations must remain smooth and lightweight.

---

## Performance & SEO

* Next/Image optimization
* Lazy loading
* Metadata API
* Accessible colors
* Mobile-first responsive design

---

## Folder Structure

Create modular structure:

```
app/
components/
lib/
types/
app/api/
```

Include:

* DB connection helper
* Auth helpers
* Reusable UI components

---

## Seed Initial Projects

Include example entries:

* Eduzon.ai
* i-Life Ace-It
* NEC Ace-It
* i-Life Learn
* Love To Read
* THEA Shoes

---

## My Current Skill Level

* Comfortable with React + Next.js
* Learning TypeScript basics
* Avoid advanced generics for now
* Prefer clear interfaces and simple typing

---

## Deliverables

Generate:

* Complete working codebase
* Setup instructions
* Environment variables example
* Vercel deployment steps
* How to access `/admin`
