# Smart Support Frontend
### AI-Powered Support Ticket Management System (UI/UX)

A high-performance, responsive frontend built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. This interface provides real-time ticket lifecycle tracking, communication logs, and intelligent insights.

---

## Key Features

### Intelligent User Experience
- **Dynamic Dashboard:** Real-time overview of ticket statuses (Open, Pending, Resolved) with reactive re-rendering.
- **Communication Center:** Interactive view for users to track communication logs and admin responses.
- **AI-Driven Insights:** Visual indicators for AI-predicted ticket categories.
- **Responsive Design:** Mobile-first approach using Tailwind CSS.

### Workflow Tools
- **Priority Indicator:** Visual categorization (High/Normal/Low) for user submitted tickets.
- **State Management:** Secure handling of JWT tokens via HTTP-only cookies and Context API.
- **Role-Based Routing:** Protected routes enforced by Next.js middleware.

---

## Technical Architecture

### Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict typing for robust data handling)
- **Styling:** Tailwind CSS (Modular architecture)
- **API Layer:** Centralized Axios service handler for communication with Node.js backend.

### Performance & Optimization
- **Modularity:** Separated Layouts, Views, and Reusable UI components.
- **Reactivity:** Real-time UI updates upon Admin status changes, minimizing prop-drilling.

---

## Installation & Setup

1. **Install dependencies:** `npm install`
2. **Configure environment (.env.local):** `NEXT_PUBLIC_API_URL=http://localhost:3000/api`
3. **Run:** `npm run dev`

---

## System Flow & UX
1. **Authenticated Access:** Secure entry through JWT-protected dashboard routes.
2. **AI-Enabled Submission:** Frontend sends data -> AI Classifies -> Real-time status update.
3. **Lifecycle Tracking:** Admins update status/comments -> Frontend reflects these changes via reactive state updates.

---

## Project Purpose
This project demonstrates:
- **Scalable Next.js Development:** Handling SSR/CSR patterns and complex state.
- **Enterprise UI/UX:** Crafting accessible, data-driven dashboards.
- **Synchronization:** Seamless integration with AI-enhanced RESTful APIs.
- **TypeScript Proficiency:** Ensuring type-safety across the request-response cycle.