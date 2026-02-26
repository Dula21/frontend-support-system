# Smart Support Frontend

### AI-Powered Support Ticket Management System

This is the frontend application for the **Smart Support** system, providing a clean, responsive interface for users and administrators to manage support tickets. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, it offers a seamless experience for ticket creation, real-time status tracking, and AI-driven insights.

---

## Overview

The Smart Support Frontend serves as the user interface for the AI-driven backend. It allows users to register, log in, and submit support issues that are automatically categorized by the backend's AI logic. Admins can view an organized dashboard to manage the ticket lifecycle efficiently.

---

## Features

* **Dynamic Dashboard**: Overview of ticket statuses (Open, Pending, Resolved).
* **Secure Authentication**: Protected routes using JWT and custom middleware.
* **Role-Based UI**:
* **User View**: Create tickets and track personal history.
* **Admin View**: Manage all system tickets and filter by AI-generated categories.


* **AI Classification Feedback**: Visual indicators showing how the AI categorized a specific ticket (e.g., Technical, Billing, General).
* **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

---

## Tech Stack

* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **State Management**: React Hooks / Context API


---


## Installation & Setup

1. **Clone the repository and install dependencies**:
```bash
npm install

```


2. **Configure Environment Variables**:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api

```


3. **Run the development server**:
```bash
npm run dev

```


4. **Build for production**:
```bash
npm run build

```



---

## Component Architecture

The application is built using a **modular component architecture**:

* **Layouts**: Persistent navigation and sidebars.
* **Views**: Page-specific logic for Dashboards and Auth forms.
* **Services**: Dedicated API layer to communicate with the Node.js backend.

---

## User Workflow

1. **Login/Register**: Secure access via JWT.
2. **Submit Ticket**: User fills out a form; the frontend sends data to the backend.
3. **AI Processing**: The frontend displays a "processing" state while the AI classifies the ticket.
4. **Review**: User sees their ticket categorized in real-time.
5. **Resolution**: Admins update statuses which reflect instantly on the user's dashboard.

---

## Project Purpose

This frontend demonstrates:

* Professional **TypeScript** implementation in a Next.js environment.
* Clean, accessible UI/UX design using **Tailwind CSS**.
* Efficient state handling for complex, data-driven applications.
* Integration with AI-enhanced backend services.

---

