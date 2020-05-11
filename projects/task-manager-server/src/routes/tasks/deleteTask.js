const TaskService = require('../../services/task-service');

module.exports = {
  method: 'DELETE',
  path: '/deleteTask/{id}',
  handler: async function (request, h) {
    console.log('request.params.id', request.params.id);
    const taskId = request.params.id;
    const taskService = new TaskService();
    const removedTask = await taskService.removeTask(taskId);
    console.log('removedTask::', removedTask);
    return h.response({});
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
