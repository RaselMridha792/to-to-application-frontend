# Task Management Application

## Overview

This is a Task Management Application that allows users to manage their tasks in a simple and intuitive way. Users can add, edit, delete, and reorder tasks, all while being able to drag-and-drop tasks between different categories such as "To-Do," "In Progress," and "Done." The app provides real-time synchronization with the database to ensure persistence of task data, even when users refresh or reopen the app.

**Live Site URL:** [Task Management Application Live](https://to-do-application-1a053.web.app)

## Features

- **Authentication**: 
  - Google Sign-In via Firebase Authentication.
  - Stores user details (User ID, email, and display name) in the database upon first login.

- **Task Management**: 
  - Add, edit, delete, and reorder tasks.
  - Tasks can be categorized into: 
    - **To-Do**
    - **In Progress**
    - **Done**
  - Drag-and-drop functionality between categories.
  - Instant synchronization with the database.

- **Database & Persistence**:
  - MongoDB to store tasks via Express.js API.
  - Real-time updates with MongoDB Change Streams/WebSockets.

- **Frontend UI**:
  - Built using Vite.js + React.
  - Modern, minimalistic, and responsive design.
  - Drag-and-drop functionality using `react-beautiful-dnd`.
  - Up to four colors for clean UI design.
  
- **Responsiveness**:
  - Smooth drag-and-drop experience on both desktop and mobile.

- **Backend**:
  - Express.js API for CRUD operations on tasks.
  - Endpoints:
    - `POST /tasks`: Add a new task.
    - `GET /tasks/:email`: Retrieve all tasks for the logged-in user.
    - `PUT /tasks/:id`: Update task details (title, description, category).
    - `DELETE /tasks/:id`: Delete a task.

- **Bonus Features**:
  - Dark mode toggle.
  - Task due dates with color indicators (e.g., overdue tasks turn red).
  - Simple activity log to track changes (e.g., "Task moved to Done").

## Live Links

- **Frontend:** [Task Management App (Frontend)](https://to-do-application-1a053.web.app)
- **Backend:** [Task Management App (Backend)](https://to-do-application-backend-beige.vercel.app)

## Technologies Used

### Frontend
- **Vite.js**: Fast build tool.
- **React.js**: JavaScript library for building user interfaces.
- **react-beautiful-dnd**: Drag-and-drop library for React.
- **Tailwind CSS**: Utility-first CSS framework.
- **Firebase Authentication**: For Google Sign-In.
- **Axios**: For making HTTP requests.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing tasks.
- **Mongoose**: MongoDB object modeling for Node.js.
- **BSON**: Binary JSON format used by MongoDB.

## Installation Steps

### Frontend
1. Clone the frontend repository.
   ```bash
   git clone https://github.com/yourusername/frontend-repo.git
   cd frontend-repo
