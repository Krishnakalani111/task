// src/utils/taskUtils.js

export const filterTasks = (tasks, searchTerm) => {
  if (!searchTerm.trim()) {
    return Object.keys(tasks)
  }

  const lowerSearchTerm = searchTerm.toLowerCase()
  
  return Object.keys(tasks).filter(taskId => {
    const task = tasks[taskId]
    
    // Search in title
    if (task.title?.toLowerCase().includes(lowerSearchTerm)) {
      return true
    }
    
    // Search in type
    if (task.type?.toLowerCase().includes(lowerSearchTerm)) {
      return true
    }
    
    // Search in description
    if (task.description?.toLowerCase().includes(lowerSearchTerm)) {
      return true
    }
    
    // Search in assignee
    if (task.assignee?.toLowerCase().includes(lowerSearchTerm)) {
      return true
    }
    
    // Search in tags
    if (task.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) {
      return true
    }
    
    return false
  })
}

export const getTypeColor = (type) => {
  const colors = {
    'BUG': 'bg-red-100 text-red-800 border-red-200',
    'FEATURE': 'bg-green-100 text-green-800 border-green-200',
    'TASK': 'bg-blue-100 text-blue-800 border-blue-200',
    'SPIKE': 'bg-purple-100 text-purple-800 border-purple-200',
    'STORY': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  }
  return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export const getPriorityColor = (priority) => {
  const colors = {
    'P0': 'text-red-600',
    'P1': 'text-orange-600',
    'P2': 'text-yellow-600',
    'P3': 'text-green-600',
  }
  return colors[priority] || 'text-gray-600'
}

export const getEffortColor = (effort) => {
  if (effort <= 2) return 'text-green-600'
  if (effort <= 5) return 'text-yellow-600'
  return 'text-red-600'
}