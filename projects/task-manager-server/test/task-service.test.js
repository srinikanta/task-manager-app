const TasksService = require('../src/services/task-service');

test('Test Task Service Get All Tasks', async function () {
  const tasksService = new TasksService();
  const tasks = await tasksService.getTasks();
  expect(tasks.length).toBeGreaterThanOrEqual(0);
});

test('Test Task Service Get Tasks By User Id', async function () {
  const tasksService = new TasksService();
  const tasks = await tasksService.getTasksByUserId(5);
  expect(tasks.length).toBeGreaterThanOrEqual(0);
});

test('Test Task Service Get Tasks By null userId', async function () {
  const tasksService = new TasksService();
  const tasks = await tasksService.getTasksByUserId();
  expect(tasks).toBe(false);
});

test('Test Task Service Add Task', async function () {
  const taskPayload = {
    title: 'Task Test Tilte',
    description: 'Task Test Description',
    userId: 5,
    creationDate: '2020-05-10',
    updatedOn: '2020-05-10',
    dueDate: '2020-05-10',
    status: 'new'
  };
  const tasksService = new TasksService();
  const task = await tasksService.addTask(taskPayload);
  expect(task.dataValues.status).toBe('new');
});

test('Test Task Service Add Task null userId', async function () {
  const taskPayload = {
    title: null,
    description: 'Task Test Description',
    userId: null,
    creationDate: '2020-05-10',
    updatedOn: '2020-05-10',
    dueDate: '2020-05-10',
    status: 'new'
  };
  const tasksService = new TasksService();
  const task = await tasksService.addTask(taskPayload);
  expect(task).toBe(false);
});

test('Test Task Service Update Task', async function () {
  const taskPayload = {
    title: 'Task Test Tilte',
    description: 'Task Test Description',
    taskId: 9,
    dueDate: '2020-05-10',
    status: 'inProgress'
  };
  const tasksService = new TasksService();
  const task = await tasksService.updatedTask(taskPayload);
  expect(task[0]).toBe(1);
});

test('should fail Task Service Update for string task id', async function () {
  const taskPayload = {
    title: 'Task Test Tilte',
    description: 'Task Test Description',
    taskId: 'abc',
    dueDate: '2020-05-10',
    status: 'inProgress'
  };
  const tasksService = new TasksService();
  const task = await tasksService.updatedTask(taskPayload);
  expect(task).toBe(false);
});

test('Test Task Service Remove Task', async function () {
  const tasksService = new TasksService();
  const task = await tasksService.removeTask(280);
  console.log('sss:::', task);
  expect(task).toBe(0);
});
