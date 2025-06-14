// src/App.jsx
import { useState } from 'react'
import Board from './components/Board/Board'
import SearchBar from './components/Search/SearchBar'
import AssigneeFilter from './components/Search/AssigneeFilter'
import { initialData } from './data/mockData'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [data, setData] = useLocalStorage('kanban-data', initialData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAssignee, setSelectedAssignee] = useState('')

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleAssigneeFilter = (assigneeId) => {
    setSelectedAssignee(assigneeId)
  }

  const handleDataUpdate = (newData) => {
    setData(newData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Projects / Beyond Gravity</div>
            <h1 className="text-2xl font-semibold text-gray-900">Board</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-blue-600">🕒 4 days remaining</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Complete sprint
              </button>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <SearchBar onSearch={handleSearch} />
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 font-medium">Filter by:</span>
              <AssigneeFilter 
                assignees={data.assignees || []}
                selectedAssignee={selectedAssignee}
                onAssigneeFilter={handleAssigneeFilter}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">GROUP BY</span>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Choices</option>
            </select>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="p-6">
        <Board 
          data={data} 
          onDataUpdate={handleDataUpdate} 
          searchTerm={searchTerm}
          selectedAssignee={selectedAssignee}
        />
      </div>
    </div>
  )
}

export default App