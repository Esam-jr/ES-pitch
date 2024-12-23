# ES Pitch

## 🚀 Overview

**ES Pitch** is a full-stack social media platform built to help entrepreneurs and startups showcase their startup ideas, collaborate with other members, and gain valuable feedback. The platform allows users to submit, browse, and interact with startup pitches, providing a space to share, discuss, and refine ideas while connecting with like-minded individuals.

## 🌐 Live Demo

[Visit ES Pitch](https://es-pitch.vercel.app)

## 🎯 Features

- **Sign Up & Login**: Authenticate through GitHub using NextAuth.
- **Startup Pitch Submission**: Submit your startup idea as a pitch, with detailed descriptions and visuals.
- **Search & Filter Pitches**: Explore pitches using various search filters (e.g., technology, industry).
- **Pitch Pages**: View detailed pages for each pitch, including progress updates and feedback.
- **User Profiles**: Each user has a profile to track their pitches and interactions.
- **Top Picks**: Featured pitches highlighted for potential opportunities.
- **Views Counter**: Track views and engagement for each startup pitch.
- **Minimalistic Design**: Simple, intuitive user interface for easy interaction.

## 🛠️ Technologies Used

- **Next.js**: For server-side rendering and seamless routing.
- **NextAuth**: Authentication with GitHub OAuth for secure login.
- **TypeScript**: Static typing for better development experience.
- **Tailwind CSS**: Responsive, utility-first CSS framework for styling.
- **Sanity**: Content management system to store and fetch pitch data.
- **shadcn UI**: A collection of beautiful UI components for React.
- **Lucide Icons**: Set of modern, customizable icons.
- **Vercel**: Hosting and deployment.

## 📱 Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **Yarn** or **npm**

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/es-pitch.git
   cd es-pitch

2. Install the project dependencies using npm:

   ```bash
   npm install
```

*Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXTAUTH_URL=http://localhost:3000
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
SANITY_PROJECT_ID=your-sanity-project-id
SANITY_DATASET=your-sanity-dataset
`````````
