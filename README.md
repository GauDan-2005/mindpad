# MindPad Client

MindPad is a collaborative, AI-powered note-taking app built with Next.js. It allows users to create, edit, organize, and share documents in real-time, with features like live cursors, AI document translation, and AI chat/Q&A.

## Features

- **Real-time Collaborative Editing**: Multiple users can edit documents simultaneously, powered by Liveblocks and Yjs.
- **AI-Powered Tools**:
  - **Translate Document**: Summarize and translate documents into different languages using AI.
  - **Chat to Document**: Ask questions about your document and get AI-generated answers.
- **User Authentication**: Secure sign-in and user management via Clerk.
- **Smart Organization**: Group and categorize notes, manage shared and owned documents.
- **Secure Cloud Storage**: All data is stored securely in Firebase Firestore.
- **Modern UI/UX**: Built with shadcn/ui, Tailwind CSS, and Radix UI for a responsive, accessible experience.
- **Dark/Light Mode**: Theme switching support.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI
- **Collaboration**: Liveblocks, Yjs
- **Authentication**: Clerk
- **Database**: Firebase Firestore
- **AI Integration**: Connects to Cloudflare Workers for AI features (translation, chat)
- **Other**: Framer Motion, React Markdown, Sonner (notifications)

## Getting Started

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_BASE_URL`: URL of your Cloudflare Worker backend for AI endpoints.
- Firebase and Clerk credentials (see `.env.example` if available).

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code

## Folder Structure

- `src/app/` – Next.js app directory (routing, layouts, pages)
- `src/components/` – UI and feature components
- `src/lib/` – Utility libraries (Liveblocks, color, etc.)
- `src/firebase.ts` – Firebase setup

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Liveblocks Documentation](https://liveblocks.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
