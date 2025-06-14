# Kanban Task Management Board

A modern, feature-rich Kanban board application built with React, Vite, and Tailwind CSS. This project provides a complete task management solution with drag-and-drop functionality, file attachments, and advanced filtering capabilities.

## 🚀 Features

### Core Functionality
- **Drag & Drop**: Move tasks between columns seamlessly using @dnd-kit
- **Task Management**: Create, edit, delete, and view tasks with detailed information
- **Column Management**: Add and remove custom columns with confirmation modals
- **Real-time Search**: Search tasks by title, type, description, assignee, or tags
- **Assignee Filtering**: Filter tasks by team members using circular avatar interface

### Task Features
- **Complete Task Data**: Title, type, priority, effort estimation, description
- **Team Assignment**: Dropdown selection from predefined team members
- **Tagging System**: Add multiple tags for better organization
- **Dependencies**: Track task relationships (depends on/blocks)
- **File Attachments**: Upload and preview images (PNG, JPG, JPEG)
- **Priority Levels**: P0 (Critical) to P3 (Low) with color coding

### UI/UX Features
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Interactive Elements**: Hover effects, animations, and visual feedback
- **Modal System**: Dedicated modals for task creation, editing, and confirmations
- **Avatar System**: Visual assignee representation with emoji avatars

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with Hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **Drag & Drop**: @dnd-kit for modern drag-and-drop functionality
- **State Management**: React useState and useEffect hooks
- **Data Persistence**: Browser localStorage for offline functionality
- **File Handling**: FileReader API for image attachments

## 📁 Project Structure

```
src/
├── components/
│   ├── Board/
│   │   ├── Board.jsx          # Main board component with drag-drop
│   │   ├── Column.jsx         # Column component with task list
│   │   ├── TaskCard.jsx       # Individual task card with drag handle
│   │   └── ColumnModal.jsx    # Add/edit column modal
│   ├── Task/
│   │   ├── TaskModal.jsx      # Task view/edit modal
│   │   └── TaskForm.jsx       # Task creation/editing form
│   ├── Search/
│   │   ├── SearchBar.jsx      # Search input component
│   │   └── AssigneeFilter.jsx # Circular avatar filter
│   └── UI/
│       └── ConfirmationModal.jsx # Reusable confirmation dialog
├── data/
│   └── mockData.js           # Initial data structure
├── hooks/
│   └── useLocalStorage.js    # Custom hook for localStorage
├── utils/
│   └── taskUtils.js          # Utility functions for filtering
└── App.jsx                   # Main application component
```

## 🎯 Key Implementation Details

### Data Architecture
- **Normalized Data Structure**: Separate tasks and columns for efficient updates
- **Local Storage**: Automatic persistence without backend dependency
- **ID-based Relationships**: Tasks reference each other by unique IDs

### Drag & Drop Implementation
- **@dnd-kit Library**: Modern, accessible drag-and-drop solution
- **Column-to-Column**: Tasks can be moved between different columns
- **Reordering**: Tasks can be reordered within the same column
- **Visual Feedback**: Drag handles and hover states for better UX

### State Management
- **React Hooks**: useState and useEffect for component state
- **Props Drilling**: Clean prop passing for component communication
- **Custom Hooks**: useLocalStorage for persistent data management

### File Handling
- **Base64 Encoding**: Images stored as base64 strings in localStorage
- **File Validation**: Only PNG, JPG, JPEG files allowed
- **Preview System**: Thumbnail previews with file size information

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📊 Data Structure

### Task Object
```javascript
{
  id: "task-1",
  title: "Task Title",
  type: "FEATURE", // BUG, FEATURE, TASK, SPIKE, STORY
  priority: "P1", // P0, P1, P2, P3
  effort: 5,
  assignee: "John Doe",
  description: "Task description",
  tags: ["frontend", "urgent"],
  dependsOn: ["task-2"],
  blocks: ["task-3"],
  attachments: [{ id, name, data, size }],
  ticketId: "NUC-123"
}
```

### Column Structure
```javascript
{
  id: "column-id",
  title: "TO DO",
  taskIds: ["task-1", "task-2"]
}
```

## 🎨 UI Components

- **Responsive Grid Layout**: Flexbox-based column system
- **Interactive Task Cards**: Hover effects and drag handles
- **Modal System**: Overlay modals for task management
- **Form Components**: Comprehensive form with validation
- **Filter Interface**: Search bar and assignee filter integration

## 💾 Data Persistence

- **localStorage Integration**: Automatic saving of all changes
- **JSON Serialization**: Efficient data storage and retrieval
- **Error Handling**: Graceful fallbacks for storage failures

## 🔧 Customization

The application is designed to be easily customizable:
- **Column Types**: Add new task types in taskUtils.js
- **Assignee List**: Update assignees in mockData.js
- **Styling**: Modify Tailwind classes for custom appearance
- **Validation**: Add custom validation rules in TaskForm.jsx

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive layout for tablets
- **Desktop Experience**: Full-featured desktop interface

---

Built with ❤️ using React, Vite, and Tailwind CSS
