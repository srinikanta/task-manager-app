const TaskService = require('../../services/task-service');

module.exports = {
  method: 'PUT',
  path: '/tasks/{taskId}',
  handler: async function (request, h) {
    console.log('request.params.id', request.params.taskId);
    const taskId = request.params.taskId;
    const payload = request.payload;
    console.log('removedTask::', taskId, payload);

    const taskService = new TaskService();
    const updatedTask = await taskService.updatedTask(payload);
    console.log(updatedTask);
    return h.response(updatedTask);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
