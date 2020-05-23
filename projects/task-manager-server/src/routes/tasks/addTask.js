const TaskService = require('../../services/task-service');

module.exports = {
  method: 'POST',
  path: '/tasks',
  handler: async function (request, h) {
    const payload = request.payload;
    const taskService = new TaskService();
    const task = payload[0];
    let taskPayload = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      userId: task.userId,
      status: task.status
    };
    const tasksRes = await taskService.addTask(taskPayload);
    console.log(tasksRes);
    return h.response(tasksRes);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
