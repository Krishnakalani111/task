// src/components/Task/TaskModal.jsx
import { useState, useEffect } from 'react'
import TaskForm from './TaskForm'

const TaskModal = ({ task, editingTask, onClose, onSave, assignees = [] }) => {
  const [isEditing, setIsEditing] = useState(!!editingTask)

  useEffect(() => {
    setIsEditing(!!editingTask)
  }, [editingTask])

  const handleEdit = () => {
    setIsEditing(true)
  }

  // If we have editingTask, we should use that; otherwise use task for viewing
  const displayTask = editingTask || task

  const handleSave = (taskData) => {
    onSave(taskData)
    // Don't set isEditing to false here, let the parent handle closing
  }

  const handleCancel = () => {
    if (editingTask?.isNew) {
      // If it's a new task, close the entire modal
      onClose()
    } else {
      // If editing existing task, go back to view mode
      setIsEditing(false)
    }
  }

  const handleClose = () => {
    // Always close the entire modal
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {isEditing ? (
          <TaskForm
            task={displayTask}
            onSave={handleSave}
            onCancel={handleCancel}
            isNew={editingTask?.isNew}
            assignees={assignees}
          />
        ) : (
          <TaskDetails
            task={displayTask}
            onEdit={handleEdit}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  )
}

const TaskDetails = ({ task, onEdit, onClose }) => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-3 py-1 text-sm font-medium rounded border bg-${task.type === 'BUG' ? 'red' : task.type === 'FEATURE' ? 'green' : 'blue'}-100 text-${task.type === 'BUG' ? 'red' : task.type === 'FEATURE' ? 'green' : 'blue'}-800`}>
              {task.type}
            </span>
            <span className="text-sm text-gray-500">{task.ticketId}</span>
            <span className={`text-sm font-medium ${task.priority === 'P0' ? 'text-red-600' : task.priority === 'P1' ? 'text-orange-600' : 'text-yellow-600'}`}>
              {task.priority}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-gray-600">{task.description || 'No description provided'}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Assignee</h3>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium">
                {task.assignee?.charAt(0) || '?'}
              </div>
              <span className="text-gray-900">{task.assignee || 'Unassigned'}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Effort</h3>
            <span className={`text-lg font-medium ${task.effort <= 2 ? 'text-green-600' : task.effort <= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
              {task.effort} points
            </span>
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dependencies */}
        {(task.dependsOn?.length > 0 || task.blocks?.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {task.dependsOn?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Depends On</h3>
                <div className="space-y-1">
                  {task.dependsOn.map((dep, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                      {dep}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {task.blocks?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Blocks</h3>
                <div className="space-y-1">
                  {task.blocks.map((block, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                      {block}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Attachments */}
        {task.attachments?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
            <div className="space-y-2">
              {task.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span>{attachment}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskModal