// src/components/Board/Column.jsx
import TaskCard from './TaskCard.jsx'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const Column = ({ column, tasks, onTaskClick, onAddTask, onEditTask,onDeleteTask, onRemoveColumn }) => {
  const { setNodeRef } = useDroppable({
    id: column.id
  });


  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-gray-50 rounded-lg p-4">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="font-medium text-gray-700 text-sm uppercase tracking-wide">
              {column.title}
            </h3>
            <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onAddTask(column.id)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
              title="Add task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={() => onRemoveColumn(column.id)}
              className="p-1 text-gray-400 hover:text-red-600 rounded"
              title="Remove column"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div 
          ref={setNodeRef}
          className="space-y-3 min-h-32"
        >
          <SortableContext 
            items={tasks.map(task => task.id)} 
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}  
              />
            ))}
          </SortableContext>
          
          {/* Add Task Button */}
          <button
            onClick={() => onAddTask(column.id)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 text-sm"
          >
            + Add a task
          </button>
        </div>
      </div>
    </div>
  )
}

export default Column
