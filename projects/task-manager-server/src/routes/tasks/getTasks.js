const TaskService = require('../../services/task-service');

module.exports = {
  method: 'GET',
  path: '/tasks',
  handler: async function (request, h) {
    const taskService = new TaskService();
    const userId = request.params.userId;
    const tasks = await taskService.getTasks();
    return h.response(tasks);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
