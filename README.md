Kanban Board Application

A responsive Kanban Board built with React, Redux Toolkit, and TypeScript, featuring task management, drag-and-drop, search, filtering, and dark/light themes.


Getting Started (how to run the project)
1. Clone the repository
git clone https://github.com/Nsathiya2003/kanban_board
cd kanban-board
2. Install dependencies
npm install
3. Run the development server
npm run dev


Features

Responsive UI: Works seamlessly on mobile and desktop screens
Task Management: Add, edit, delete tasks
Drag & Drop: Move tasks across columns (To Do, In Progress, Done)
Search: Search tasks by title
Filter: Filter tasks by -Priority (High, Medium, Low) and Due Date
Theme: Dark and Light mode with persistence
Persistent Storage: All tasks are stored in localStorage and retained across page refresh
Column Headers: Dynamically change color based on theme


Tech Stack

Frontend: React + TypeScript
State Management: Redux Toolkit
Drag & Drop: @dnd-kit/core, @dnd-kit/sortable
Styling: TailwindCSS
Icons: Lucide React
Build Tool: Vite


Challenges & Solutions

Persistent task deletion
Problem: Deleting a task removed it from UI, but refreshing restored old data.
Solution: Updated Redux slice to save changes to localStorage after every deletion.

Dark/Light Theme Synchronization
Problem: Theme change didn’t persist across refresh or apply to column headers.
Solution: Used localStorage to save theme and dynamically update column header gradients.

Usage

Add a task → assign title, description, priority, due date → save
Drag tasks between columns
Delete a task → updates both UI and localStorage
Use search bar to find tasks by title
Use filter dropdown for priority and due date
Toggle between dark and light mode → theme persists