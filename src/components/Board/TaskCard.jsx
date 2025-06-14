// src/components/Board/TaskCard.jsx
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getTypeColor, getPriorityColor, getEffortColor } from '../../utils/taskUtils'

const TaskCard = ({ task, onClick, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const handleCardClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  const handleEditPointerDown = (e) => {
    console.log("Edit pointer down - preventing drag");
    e.stopPropagation();
  };
  const handleDeletePointerDown = (e) => {
    console.log("Delete pointer down - preventing drag");
    e.stopPropagation();
  };

  const handleEditClick = (e) => {
    e.stopPropagation()
    onEdit()
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded border ${getTypeColor(task.type)}`}>
            {task.type}
          </span>
          <span className="text-xs text-gray-500">{task.ticketId}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleEditClick}
             onPointerDown={handleEditPointerDown}
            onMouseDown={handleEditPointerDown}
            className="p-1 text-gray-400 hover:text-blue-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-1 text-gray-400 hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete task"
              onPointerDown={handleDeletePointerDown}
            onMouseDown={handleDeletePointerDown}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Task Title */}
      <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Task Meta */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          <span className={`font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`font-medium ${getEffortColor(task.effort)}`}>
            {task.effort} pts
          </span>
        </div>
        
        {/* Assignee Avatar */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
            {task.assignee?.charAt(0) || '?'}
          </div>
        </div>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Dependencies indicator */}
      {(task.dependsOn?.length > 0 || task.blocks?.length > 0) && (
        <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
          {task.dependsOn?.length > 0 && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Depends: {task.dependsOn.length}
            </span>
          )}
          {task.blocks?.length > 0 && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Blocks: {task.blocks.length}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskCard