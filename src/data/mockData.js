// src/data/mockData.js
export const initialData = {
  columns: {
    'todo': {
      id: 'todo',
      title: 'TO DO',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'in-progress': {
      id: 'in-progress',
      title: 'IN PROGRESS',
      taskIds: ['task-4', 'task-5', 'task-6', 'task-7']
    },
    'in-review': {
      id: 'in-review',
      title: 'IN REVIEW',
      taskIds: ['task-8']
    },
    'done': {
      id: 'done',
      title: 'DONE',
      taskIds: ['task-9', 'task-10', 'task-11', 'task-12']
    }
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Implement feedback collector',
      type: 'FEATURE',
      description: 'Build a system to collect user feedback',
      priority: 'P1',
      effort: 9,
      assignee: 'John Doe',
      tags: ['frontend', 'user-experience'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-205'
    },
    'task-2': {
      id: 'task-2',
      title: 'Bump version for new API for billing',
      type: 'BUG',
      description: 'Update API version to support new billing features',
      priority: 'P0',
      effort: 3,
      assignee: 'Jane Smith',
      tags: ['api', 'billing'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-206'
    },
    'task-3': {
      id: 'task-3',
      title: 'Add NPS feedback to wallboard',
      type: 'FEATURE',
      description: 'Display NPS scores on the main dashboard',
      priority: 'P2',
      effort: 1,
      assignee: 'Mike Johnson',
      tags: ['dashboard', 'analytics'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-208'
    },
    'task-4': {
      id: 'task-4',
      title: 'Update T&C copy with v1.9 from the writers team in all products that have cross country compliance',
      type: 'TASK',
      description: 'Legal compliance update across all products',
      priority: 'P0',
      effort: 1,
      assignee: 'Sarah Wilson',
      tags: ['legal', 'compliance'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-213'
    },
    'task-5': {
      id: 'task-5',
      title: 'Tech spike on new stripe integration with paypal',
      type: 'SPIKE',
      description: 'Research integration possibilities',
      priority: 'P1',
      effort: 3,
      assignee: 'Alex Brown',
      tags: ['payment', 'integration'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-215'
    },
    'task-6': {
      id: 'task-6',
      title: 'Refactor stripe verification key validator to a single call to avoid timing out on slow connections',
      type: 'FEATURE',
      description: 'Performance optimization for payment verification',
      priority: 'P1',
      effort: 3,
      assignee: 'David Lee',
      tags: ['performance', 'payment'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-216'
    },
    'task-7': {
      id: 'task-7',
      title: 'Change phone number field type to \'phone\'',
      type: 'BUG',
      description: 'Update form field type for better UX',
      priority: 'P2',
      effort: 1,
      assignee: 'Lisa Garcia',
      tags: ['forms', 'ux'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-217'
    },
    'task-8': {
      id: 'task-8',
      title: 'Multi-dest search UI web',
      type: 'FEATURE',
      description: 'Build multi-destination search interface',
      priority: 'P1',
      effort: 5,
      assignee: 'Tom Anderson',
      tags: ['search', 'ui'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-338'
    },
    'task-9': {
      id: 'task-9',
      title: 'Quick booking for accommodations - web',
      type: 'FEATURE',
      description: 'Streamlined booking process for accommodations',
      priority: 'P1',
      effort: 4,
      assignee: 'Emma Davis',
      tags: ['booking', 'web'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-336'
    },
    'task-10': {
      id: 'task-10',
      title: 'Adapt web app no new payments provider',
      type: 'BUG',
      description: 'Handle payment provider changes',
      priority: 'P0',
      effort: 3,
      assignee: 'Chris Taylor',
      tags: ['payment', 'web'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-346'
    },
    'task-11': {
      id: 'task-11',
      title: 'Fluid booking on tablets',
      type: 'FEATURE',
      description: 'Optimize booking flow for tablet devices',
      priority: 'P1',
      effort: 5,
      assignee: 'Ryan Miller',
      tags: ['mobile', 'booking'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-343'
    },
    'task-12': {
      id: 'task-12',
      title: 'Shoping cart purchasing error - quick fix required',
      type: 'BUG',
      description: 'Critical shopping cart bug fix',
      priority: 'P0',
      effort: 1,
      assignee: 'Nicole White',
      tags: ['cart', 'bug-fix'],
      attachments: [],
      dependsOn: [],
      blocks: [],
      ticketId: 'NUC-354'
    }
  },
  columnOrder: ['todo', 'in-progress', 'in-review', 'done']
}