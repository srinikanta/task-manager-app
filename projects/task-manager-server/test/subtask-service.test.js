const SubTaskService = require('../src/services/subtask-service');

test('Test Status Types Service', async function () {
  const subTaskService = new SubTaskService();
  const subTasks = await subTaskService.getSubTasks(9);
  expect(subTasks.length).toBeGreaterThanOrEqual(0);
});

test('Test Status Types Service null taskId return false', async function () {
  const subTaskService = new SubTaskService();
  const subTasks = await subTaskService.getSubTasks();
  expect(subTasks).toBe(false);
});

test('Test Status Types Service Add Subtask', async function () {
  let subTaskPayload = {
    title: 'Subtask Title1',
    description: 'Subtask Description1',
    dueDate: '2020-05-25',
    taskId: 9,
    creationDate: '2020-05-21'
  };
  const subTaskService = new SubTaskService();
  const subTasks = await subTaskService.addSubTask(subTaskPayload);
  //console.log('subTasks:::', subTasks);
  expect(subTasks.dataValues.taskId).toBe(9);
});

test('Test Status Types Service Add Subtask error', async function () {
  let subTaskPayload = {
    title: 'Subtask Title1',
    description: 'Subtask Description1',
    dueDate: '2020-05-25',
    taskId: null,
    creationDate: '2020-05-21'
  };
  const subTaskService = new SubTaskService();
  const reponse = await subTaskService.addSubTask(subTaskPayload);
  //console.log('subTasks:::', subTasks);
  expect(reponse).toBe(false);
});
