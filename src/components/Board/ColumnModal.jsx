// src/components/Board/ColumnModal.jsx
import { useState } from 'react'

const ColumnModal = ({ isOpen, onClose, onSave, column = null }) => {
  const [columnName, setColumnName] = useState(column?.title || '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!columnName.trim()) {
      setError('Column name is required')
      return
    }

    if (columnName.trim().length < 2) {
      setError('Column name must be at least 2 characters')
      return
    }

    onSave(columnName.trim().toUpperCase())
    setColumnName('')
    setError('')
    onClose()
  }

  const handleClose = () => {
    setColumnName('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {column ? 'Edit Column' : 'Add New Column'}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="columnName" className="block text-sm font-medium text-gray-700 mb-2">
                Column Name *
              </label>
              <input
                type="text"
                id="columnName"
                value={columnName}
                onChange={(e) => {
                  setColumnName(e.target.value)
                  setError('')
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter column name (e.g., IN TESTING, READY TO DEPLOY)"
                autoFocus
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {column ? 'Update Column' : 'Add Column'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ColumnModal