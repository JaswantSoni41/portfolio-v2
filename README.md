# Modern Developer Portfolio

A production-ready portfolio website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and MongoDB.

## Features

- **Modern Tech Stack**: Next.js App Router, React, TypeScript.
- **Dynamic Content**: Projects managed via MongoDB and Admin Panel.
- **Animations**: Smooth transitions with Framer Motion.
- **Responsive Design**: Fully responsive UI with Tailwind CSS.
- **Admin Dashboard**: Secure panel to add, edit, and delete projects.
- **Interactive UI**: Custom components inspired by shadcn/ui.

## Setup Instructions

1.  **Clone the repository** (if not already done).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    - Copy `.env.example` to `.env.local`:
      ```bash
      cp .env.example .env.local
      ```
    - Update `MONGODB_URI` with your MongoDB connection string.
    - Set `ADMIN_PASSWORD` (default: admin123) and `JWT_SECRET`.

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Seeding

To populate the database with initial projects:
1.  Ensure your server is running.
2.  Visit [http://localhost:3000/api/seed](http://localhost:3000/api/seed) in your browser.
3.  You should see `{"message":"Database seeded successfully"}`.

## Accessing Admin Panel

1.  Navigate to `/login`.
2.  Enter the password defined in `.env.local` (default: `admin123`).
3.  You will be redirected to `/admin` where you can manage projects.

## Deployment

### Vercel Deployment

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and create a new project.
3.  Import your repository.
4.  In the **Environment Variables** section, add:
    - `MONGODB_URI`
    - `ADMIN_PASSWORD`
    - `JWT_SECRET`
5.  Click **Deploy**.

## Folder Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: React components (UI, Sections).
- `lib/`: Utility functions and database connection.
- `models/`: Mongoose schemas.
- `types/`: TypeScript interfaces.
- `public/`: Static assets.

## Customization

- **Colors**: Edit `app/globals.css` to change the primary accent color.
- **Fonts**: The `Inter` font is configured in `app/layout.tsx`.
- **Content**: Update component text in `components/` for static content.

## License

MIT
# portfolio-v2
