const TaskService = require('../../services/task-service');

module.exports = {
  method: 'GET',
  path: '/subTasks/{id}',
  handler: async function(request, h) {
    
    const taskService =  new TaskService();
    const taskId = request.params.id;
    console.log(taskId);
    const subTasks = await taskService.getSubTasks(taskId);
    return h.response(subTasks);

  },
  options: {
		auth: false,
		tags: ['api'],
		description: 'Route to get tasks'
	}
}
