const TaskService = require('../../services/task-service');

module.exports = {
  method: 'POST',
  path: '/addSubTask',
  handler: async function (request, h) {
    const payload = request.payload;
    const taskService = new TaskService();
    let subTaskPayload = {
      title: payload.title,
      description: payload.description,
      dueDate: payload.dueDate,
      taskId: payload.taskId,
      creationDate: payload.creationDate
    };
    const subTasks = await taskService.addSubTask(subTaskPayload);
    console.log(subTasks);
    return h.response({ subTasks });
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
