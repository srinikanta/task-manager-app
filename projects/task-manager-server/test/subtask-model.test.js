const SubTasksModel = require('../src/models/subtask.model');

test('Test Sub Task Model', async () => {
  const queryResponse = await SubTasksModel.findAll({
    where: {
      taskId: 9
    },
    attributes: [
      'subTaskId',
      'taskId',
      'title',
      'description',
      'creationDate',
      'updatedOn'
    ]
  });
  expect(queryResponse.length).toBeGreaterThanOrEqual(0);
});
