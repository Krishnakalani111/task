// src/utils/taskUtils.js

export const filterTasks = (tasks, searchTerm, selectedAssignee, assignees = []) => {
  console.log('filterTasks - selectedAssignee:', selectedAssignee)
  console.log('filterTasks - assignees:', assignees)
  
  let filteredTaskIds = Object.keys(tasks)

  // Filter by search term
  if (searchTerm && searchTerm.trim()) {
    const lowerSearchTerm = searchTerm.toLowerCase()
    
    filteredTaskIds = filteredTaskIds.filter(taskId => {
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
      
      // Search in assignee (now searches by name)
      if (task.assignee?.toLowerCase().includes(lowerSearchTerm)) {
        return true
      }
      
      // Search in tags
      if (task.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) {
        return true
      }
      
      // Search in ticket ID
      if (task.ticketId?.toLowerCase().includes(lowerSearchTerm)) {
        return true
      }
      
      return false
    })
  }

  // Filter by selected assignee
  if (selectedAssignee && selectedAssignee !== '') {
    console.log('Filtering by assignee ID:', selectedAssignee)
    const selectedAssigneeData = assignees.find(a => a.id.toString() === selectedAssignee.toString())
    console.log('Found assignee data:', selectedAssigneeData)
    
    if (selectedAssigneeData) {
      filteredTaskIds = filteredTaskIds.filter(taskId => {
        const task = tasks[taskId]
        console.log(`Task ${taskId} assignee:`, task.assignee, 'Looking for:', selectedAssigneeData.name)
        return task.assignee === selectedAssigneeData.name
      })
    }
  }

  console.log('Final filtered task IDs:', filteredTaskIds)
  return filteredTaskIds
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