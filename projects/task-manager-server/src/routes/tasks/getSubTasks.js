const SubTaskService = require('../../services/subtask-service');

module.exports = {
  method: 'GET',
  path: '/sub-tasks/{taskId}',
  handler: async function (request, h) {
    const subTaskService = new SubTaskService();
    const taskId = request.params.taskId;
    console.log(taskId);
    const subTasks = await subTaskService.getSubTasks(taskId);
    return h.response(subTasks);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
