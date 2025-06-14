// src/components/Task/TaskForm.jsx
import { useState } from 'react'

const TaskForm = ({ task, onSave, onCancel, isNew, assignees = [], allTasks = {} }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    type: task?.type || 'FEATURE',
    description: task?.description || '',
    priority: task?.priority || 'P2',
    effort: task?.effort || 1,
    assignee: task?.assignee || '',
    tags: task?.tags?.join(', ') || '',
    dependsOn: task?.dependsOn?.join(', ') || '',
    blocks: task?.blocks?.join(', ') || '',
    attachments: task?.attachments || []
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    
    files.forEach(file => {
      if (file.type.match(/^image\/(png|jpg|jpeg)$/)) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const attachment = {
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            type: file.type,
            size: file.size,
            data: event.target.result // Base64 data
          }
          
          setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, attachment]
          }))
        }
        reader.readAsDataURL(file)
      } else {
        alert('Only PNG, JPG, and JPEG files are allowed')
      }
    })
    
    // Clear the input
    e.target.value = ''
  }

  const handleRemoveAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.title.trim()) {
      alert('Title is required')
      return
    }
    
    const processedData = {
      ...formData,
      title: formData.title.trim(),
      effort: parseInt(formData.effort) || 1,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      dependsOn: formData.dependsOn ? formData.dependsOn.split(',').map(dep => dep.trim()).filter(dep => dep) : [],
      blocks: formData.blocks ? formData.blocks.split(',').map(block => block.trim()).filter(block => block) : [],
      attachments: formData.attachments
    }
    
    onSave(processedData)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {isNew ? 'Create New Task' : 'Edit Task'}
        </h2>
        {/* <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task title"
          />
        </div>

        {/* Type and Priority Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="BUG">Bug</option>
              <option value="FEATURE">Feature</option>
              <option value="TASK">Task</option>
              <option value="SPIKE">Spike</option>
              <option value="STORY">Story</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="P0">P0 - Critical</option>
              <option value="P1">P1 - High</option>
              <option value="P2">P2 - Medium</option>
              <option value="P3">P3 - Low</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task description"
          />
        </div>

        {/* Assignee and Effort Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-2">
              Assignee
            </label>
            <select
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select assignee...</option>
              {assignees && assignees.length > 0 ? (
                assignees.map((assignee) => (
                  <option key={assignee.id} value={assignee.name}>
                    {assignee.name}
                  </option>
                ))
              ) : (
                <option disabled>No assignees available</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="effort" className="block text-sm font-medium text-gray-700 mb-2">
              Effort Estimation (Points)
            </label>
            <input
              type="number"
              id="effort"
              name="effort"
              min="1"
              max="20"
              value={formData.effort}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter tags separated by commas (e.g., frontend, api, urgent)"
          />
        </div>

        {/* Dependencies */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="dependsOn" className="block text-sm font-medium text-gray-700 mb-2">
              Depends On
            </label>
            <input
              type="text"
              id="dependsOn"
              name="dependsOn"
              value={formData.dependsOn}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task IDs separated by commas (e.g., task-1, task-2)"
            />
          </div>

          <div>
            <label htmlFor="blocks" className="block text-sm font-medium text-gray-700 mb-2">
              Blocks
            </label>
            <input
              type="text"
              id="blocks"
              name="blocks"
              value={formData.blocks}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task IDs separated by commas (e.g., task-3, task-4)"
            />
          </div>
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attachments
          </label>
          <div className="space-y-3">
            <div>
              <input
                type="file"
                id="attachments"
                accept=".png,.jpg,.jpeg"
                multiple
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Only PNG, JPG, and JPEG files are allowed. Multiple files can be selected.
              </p>
            </div>
            
            {/* Uploaded Files */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                    <div className="flex items-center space-x-3">
                      {attachment.data && (
                        <img 
                          src={attachment.data} 
                          alt={attachment.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(attachment.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          {/* <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            disabled={!formData.title.trim()}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isNew ? 'Create Task' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm