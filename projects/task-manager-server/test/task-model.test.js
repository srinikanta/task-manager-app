const TasksModel = require('../src/models/tasks.model');

test('Test Tasks Model', async () => {
  const tasks = await TasksModel.findAll({
    where: {
      userId: 5
    }
  });
  expect(tasks.length).toBeGreaterThanOrEqual(0);
});
