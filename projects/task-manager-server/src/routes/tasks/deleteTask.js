const TaskService = require('../../services/task-service');

module.exports = {
  method: 'DELETE',
  path: '/tasks/{taskId}',
  handler: async function (request, h) {
    console.log('request.params.id', request.params.taskId);
    const taskId = request.params.taskId;
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
