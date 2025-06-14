// src/components/Board/Board.jsx
import { useState } from 'react'
import Column from './Column'
import TaskModal from '../Task/TaskModal'
import { filterTasks } from '../../utils/taskUtils'

const Board = ({ data, onDataUpdate, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  // Filter tasks based on search term
  const filteredTasks = filterTasks(data.tasks, searchTerm)

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleAddTask = (columnId) => {
    setEditingTask({ columnId, isNew: true })
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask({ ...task, isNew: false })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
    setEditingTask(null)
  }

  const handleSaveTask = (taskData) => {
    if (editingTask?.isNew) {
      // Add new task
      const newTaskId = `task-${Date.now()}`
      const newTask = {
        ...taskData,
        id: newTaskId,
        ticketId: `NUC-${Math.floor(Math.random() * 1000)}`
      }

      const newData = {
        ...data,
        tasks: {
          ...data.tasks,
          [newTaskId]: newTask
        },
        columns: {
          ...data.columns,
          [editingTask.columnId]: {
            ...data.columns[editingTask.columnId],
            taskIds: [...data.columns[editingTask.columnId].taskIds, newTaskId]
          }
        }
      }
      onDataUpdate(newData)
    } else {
      // Update existing task
      const newData = {
        ...data,
        tasks: {
          ...data.tasks,
          [editingTask.id]: { ...editingTask, ...taskData }
        }
      }
      onDataUpdate(newData)
    }
    handleCloseModal()
  }

//   const handleDragEnd = (result) => {
//     const { destination, source, draggableId } = result

//     if (!destination) return

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) return

//     const start = data.columns[source.droppableId]
//     const finish = data.columns[destination.droppableId]

//     if (start === finish) {
//       // Moving within the same column
//       const newTaskIds = Array.from(start.taskIds)
//       newTaskIds.splice(source.index, 1)
//       newTaskIds.splice(destination.index, 0, draggableId)

//       const newColumn = {
//         ...start,
//         taskIds: newTaskIds
//       }

//       const newData = {
//         ...data,
//         columns: {
//           ...data.columns,
//           [newColumn.id]: newColumn
//         }
//       }

//       onDataUpdate(newData)
//       return
//     }

//     // Moving from one column to another
//     const startTaskIds = Array.from(start.taskIds)
//     startTaskIds.splice(source.index, 1)
//     const newStart = {
//       ...start,
//       taskIds: startTaskIds
//     }

//     const finishTaskIds = Array.from(finish.taskIds)
//     finishTaskIds.splice(destination.index, 0, draggableId)
//     const newFinish = {
//       ...finish,
//       taskIds: finishTaskIds
//     }

//     const newData = {
//       ...data,
//       columns: {
//         ...data.columns,
//         [newStart.id]: newStart,
//         [newFinish.id]: newFinish
//       }
//     }

//     onDataUpdate(newData)
//   }

  const handleAddColumn = () => {
    const columnName = prompt('Enter column name:')
    if (!columnName) return

    const newColumnId = `column-${Date.now()}`
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: {
          id: newColumnId,
          title: columnName.toUpperCase(),
          taskIds: []
        }
      },
      columnOrder: [...data.columnOrder, newColumnId]
    }
    onDataUpdate(newData)
  }

  const handleRemoveColumn = (columnId) => {
    if (Object.keys(data.columns).length <= 1) {
      alert('Cannot remove the last column')
      return
    }

    const column = data.columns[columnId]
    if (column.taskIds.length > 0) {
      if (!confirm('This column contains tasks. Are you sure you want to delete it? All tasks will be lost.')) {
        return
      }
    }

    const newColumns = { ...data.columns }
    delete newColumns[columnId]

    // Remove tasks that were in this column
    const newTasks = { ...data.tasks }
    column.taskIds.forEach(taskId => {
      delete newTasks[taskId]
    })

    const newData = {
      ...data,
      columns: newColumns,
      tasks: newTasks,
      columnOrder: data.columnOrder.filter(id => id !== columnId)
    }
    onDataUpdate(newData)
  }

  return (
    <div className="h-full">
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId]
          const tasks = column.taskIds
            .map(taskId => data.tasks[taskId])
            .filter(task => task && filteredTasks.includes(task.id))

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onTaskClick={handleTaskClick}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onRemoveColumn={handleRemoveColumn}
            />
          )
        })}
        
        {/* Add Column Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleAddColumn}
            className="w-80 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-600"
          >
            <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Column
          </button>
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          editingTask={editingTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  )
}

export default Board