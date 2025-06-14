// src/components/Search/AssigneeFilter.jsx

  const AssigneeFilter = ({ assignees, selectedAssignee, onAssigneeFilter }) => {
  const handleAssigneeClick = (assigneeId) => {
    console.log('AssigneeFilter - clicked assignee ID:', assigneeId)
    console.log('AssigneeFilter - current selected:', selectedAssignee)
    
    if (selectedAssignee === assigneeId) {
      // If already selected, deselect (show all)
      console.log('Deselecting assignee')
      onAssigneeFilter('')
    } else {
      // Select the assignee
      console.log('Selecting assignee:', assigneeId)
      onAssigneeFilter(assigneeId)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {/* All Assignees Circle */}
      <button
        onClick={() => handleAssigneeClick('')}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
          !selectedAssignee 
            ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        title="All Assignees"
      >
        👥
      </button>

      {/* Individual Assignee Circles */}
      {assignees.map((assignee) => (
        <button
          key={assignee.id}
          onClick={() => handleAssigneeClick(assignee.id)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
            selectedAssignee === assignee.id
              ? 'bg-blue-600 text-white ring-2 ring-blue-300 scale-110' 
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
          }`}
          title={assignee.name}
        >
          {assignee.avatar || assignee.name.charAt(0)}
        </button>
      ))}

      {/* Show count indicator */}
      <span className="text-xs text-gray-500 ml-2">
        +{assignees.length}
      </span>
    </div>
  )
}

export default AssigneeFilter