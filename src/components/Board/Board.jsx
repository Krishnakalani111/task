// src/components/Board/Board.jsx
import { useState } from 'react'
import Column from './Column'
import TaskModal from '../Task/TaskModal'
import ConfirmationModal from '../UI/ConfirmationModal'
import ColumnModal from './ColumnModal'
import { filterTasks } from '../../utils/taskUtils'
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

const Board = ({ data, onDataUpdate, searchTerm, selectedAssignee }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, taskId: null, taskTitle: '' })
  const [columnModal, setColumnModal] = useState({ isOpen: false, column: null })
  const [columnDeleteConfirmation, setColumnDeleteConfirmation] = useState({ isOpen: false, columnId: null, columnTitle: '', hasTask: false })

  // Get assignees from data
  const assignees = data.assignees || []

  // Filter tasks based on search term and selected assignee
  const filteredTasks = filterTasks(data.tasks, searchTerm, selectedAssignee, assignees)

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleAddTask = (columnId) => {
    setEditingTask({ columnId, isNew: true })
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask({ ...task, isNew: false })
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const handleDeleteTask = (taskId) => {
    const task = data.tasks[taskId]
    setDeleteConfirmation({
      isOpen: true,
      taskId,
      taskTitle: task?.title || 'this task'
    })
  }

  const confirmDelete = () => {
    const taskId = deleteConfirmation.taskId
    
    // Find which column contains this task
    let columnId = null
    for (const [colId, column] of Object.entries(data.columns)) {
      if (column.taskIds.includes(taskId)) {
        columnId = colId
        break
      }
    }

    if (!columnId) return

    // Remove task from column and tasks object
    const newData = {
      ...data,
      tasks: {
        ...data.tasks
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: data.columns[columnId].taskIds.filter(id => id !== taskId)
        }
      }
    }

    // Remove the task from tasks object
    delete newData.tasks[taskId]

    onDataUpdate(newData)
    setDeleteConfirmation({ isOpen: false, taskId: null, taskTitle: '' })
  }

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, taskId: null, taskTitle: '' })
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (result) => {
    const { active, over } = result
    
    if (!over) return
    
    const activeId = active.id
    const overId = over.id
    
    // Find the source and destination columns
    const activeColId = Object.keys(data.columns).find(
      colId => data.columns[colId].taskIds.includes(activeId)
    )
    const overColId = Object.keys(data.columns).find(
      colId => data.columns[colId].taskIds.includes(overId)
    ) || over.id // If dropping directly on a column
    
    if (!activeColId) return
    
    // Same column reordering
    if (activeColId === overColId) {
      const column = data.columns[activeColId]
      const oldIndex = column.taskIds.indexOf(activeId)
      const newIndex = column.taskIds.indexOf(overId)
      
      if (oldIndex === newIndex) return
      
      const newTaskIds = arrayMove(column.taskIds, oldIndex, newIndex)
      
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [activeColId]: {
            ...column,
            taskIds: newTaskIds
          }
        }
      }
      
      onDataUpdate(newData)
      return
    }
    
    // Moving between columns
    const startColumn = data.columns[activeColId]
    const finishColumn = data.columns[overColId]
    
    const startTaskIds = [...startColumn.taskIds]
    const finishTaskIds = [...finishColumn.taskIds]
    
    const sourceIndex = startTaskIds.indexOf(activeId)
    startTaskIds.splice(sourceIndex, 1)
    
    const destinationIndex = overId === overColId 
      ? finishTaskIds.length 
      : finishTaskIds.indexOf(overId)
    
    finishTaskIds.splice(destinationIndex, 0, activeId)
    
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [activeColId]: {
          ...startColumn,
          taskIds: startTaskIds
        },
        [overColId]: {
          ...finishColumn,
          taskIds: finishTaskIds
        }
      }
    }
    
    onDataUpdate(newData)
  }

  const handleAddColumn = () => {
    setColumnModal({ isOpen: true, column: null })
  }

  const handleSaveColumn = (columnName) => {
    const newColumnId = `column-${Date.now()}`
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: {
          id: newColumnId,
          title: columnName,
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
    setColumnDeleteConfirmation({
      isOpen: true,
      columnId,
      columnTitle: column.title,
      hasTasks: column.taskIds.length > 0
    })
  }

  const confirmColumnDelete = () => {
    const columnId = columnDeleteConfirmation.columnId
    const column = data.columns[columnId]

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
    setColumnDeleteConfirmation({ isOpen: false, columnId: null, columnTitle: '', hasTasks: false })
  }

  const cancelColumnDelete = () => {
    setColumnDeleteConfirmation({ isOpen: false, columnId: null, columnTitle: '', hasTasks: false })
  }

  return (
    <div className="h-full">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
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
                onDeleteTask={handleDeleteTask}
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
      </DndContext>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          editingTask={editingTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          assignees={assignees}
          allTasks={data.tasks}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteConfirmation.taskTitle}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Column Modal */}
      <ColumnModal
        isOpen={columnModal.isOpen}
        column={columnModal.column}
        onClose={() => setColumnModal({ isOpen: false, column: null })}
        onSave={handleSaveColumn}
      />

      {/* Column Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={columnDeleteConfirmation.isOpen}
        title="Delete Column"
        message={
          columnDeleteConfirmation.hasTasks
            ? `Are you sure you want to delete "${columnDeleteConfirmation.columnTitle}"? This column contains ${data.columns[columnDeleteConfirmation.columnId]?.taskIds.length || 0} tasks. All tasks in this column will be permanently deleted.`
            : `Are you sure you want to delete "${columnDeleteConfirmation.columnTitle}"? This action cannot be undone.`
        }
        onConfirm={confirmColumnDelete}
        onCancel={cancelColumnDelete}
      />
    </div>
  )
}

export default Board