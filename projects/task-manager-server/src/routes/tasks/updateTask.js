const TaskService = require('../../services/task-service');

module.exports = {
  method: 'PUT',
  path: '/updateTask/{id}',
  handler: async function(request, h) {  
    console.log('request.params.id', request.params.id);
    const taskId = request.params.id;
    const payload = request.payload;
    console.log('removedTask::', taskId, payload);

    const taskService =  new TaskService();
    const updatedTask = await taskService.updatedTask(payload);
    console.log(updatedTask)
    return h.response(updatedTask);
  },
  options: {
		auth: false,
		tags: ['api'],
    description: 'Route to get tasks'
	}
}
