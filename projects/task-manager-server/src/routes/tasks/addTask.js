const TaskService = require('../../services/task-service');

module.exports = {
  method: 'POST',
  path: '/addTask',
  handler: async function (request, h) {
    const payload = request.payload;
    const taskService = new TaskService();
    let taskPayload = {
      title: payload.title,
      description: payload.description,
      dueDate: payload.dueDate,
      userId: payload.userId,
      status: payload.status
    };
    const tasks = await taskService.addTask(taskPayload);
    console.log(payload);
    return h.response({});
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
