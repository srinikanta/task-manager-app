const TaskService = require('../../services/task-service');

module.exports = {
  method: 'GET',
  path: '/tasksByUserId/{userId}',
  handler: async function(request, h) {
    
    const taskService =  new TaskService();
    const userId = request.params.userId;
    const tasks = await taskService.getTasksByUserId(userId);
    return h.response(tasks);

  },
  options: {
		auth: false,
		tags: ['api'],
		description: 'Route to get tasks'
	}
}
