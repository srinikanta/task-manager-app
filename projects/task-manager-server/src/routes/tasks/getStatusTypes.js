const TaskService = require('../../services/task-service');

module.exports = {
  method: 'GET',
  path: '/statusTypes',
  handler: async function(request, h) {
    
    const taskService =  new TaskService();
    const statusTypes = await taskService.getStatusTypes();
    return h.response(statusTypes);

  },
  options: {
		auth: false,
		tags: ['api'],
		description: 'Route to get Status Types'
	}
}
