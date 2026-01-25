# FishEye Project Website

The official documentation and development log website for the FishEye Autonomous Underwater Vehicle (AUV) project. This platform serves as a central hub for tracking progress, documenting subsystems, and managing tasks for the Scoop Fish team at Olin College.

![FishEye Banner](public/vite.svg)

## 🚀 Features

- **Project Timeline**: Visual history of the project's milestones and development phases.
- **Subsystem Documentation**: dedicated pages for each technical subsystem (AUV, CV, Controls, etc.) with detailed overviews.
- **Dynamic Development Logs**: An authenticated logging system where team members can post updates, images, and progress reports for specific subsystems.
- **Task Management**: A Trello-style Kanban board to track active, pending, and completed tasks.
- **Team Directory**: Profiles of all team members.
- **Authentication**: Secure login via Supabase to manage content.

## 🛠 Technology Stack

- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Database**: [Supabase](https://supabase.com/) (Auth + Postgres)
- **Deployment**: GitHub Pages

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/olincollege/scope-fish-website.git
   cd scope-fish-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🗄 Database Setup

The project uses Supabase for storing development logs and authentication.

1. Create a new Supabase project.
2. Go to the SQL Editor in your Supabase dashboard.
3. Copy the contents of `supabase_setup.sql` from this repository.
4. Run the SQL script to create the necessary tables (`project_logs`) and security policies.

## 🚢 Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

- The build workflow is defined in `.github/workflows/deploy.yml`.
- Pushing to the `main` branch triggers a new build and deployment.

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
