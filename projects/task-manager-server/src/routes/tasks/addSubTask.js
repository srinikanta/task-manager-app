const SubTaskService = require('../../services/subtask-service');

module.exports = {
  method: 'POST',
  path: '/sub-tasks',
  handler: async function (request, h) {
    const payload = request.payload;
    const subTaskService = new SubTaskService();
    const subTask = payload[0];
    let subTaskPayload = {
      title: subTask.title,
      description: subTask.description,
      dueDate: subTask.dueDate,
      taskId: subTask.taskId,
      creationDate: subTask.creationDate
    };
    const subTasksRes = await subTaskService.addSubTask(subTaskPayload);
    console.log(subTasksRes);
    return h.response({ subTasksRes });
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
