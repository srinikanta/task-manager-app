const server = require('../lib/server'); // Import Server/Application

// Start application before running the test case
beforeAll((done) => {
  server.events.on('start', () => {
    done();
  });
});

// Stop application after running the test case
afterAll((done) => {
  server.events.on('stop', () => {
    done();
  });
  server.stop();
});

test('should success with server connection', async function () {
  const options = {
    method: 'GET',
    url: '/'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should responds with 200 for status-types successfully', async function () {
  const options = {
    method: 'GET',
    url: '/status-types'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should responds with 200 for tasks successfully', async function () {
  const options = {
    method: 'GET',
    url: '/tasks'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should responds with 200 for tasks/1 successfully', async function () {
  const options = {
    method: 'GET',
    url: '/tasks/1'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should fail in adding tasks due to no payload', async function () {
  const options = {
    method: 'POST',
    url: '/tasks'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(500);
});

test('should add task successfully', async function () {
  const taskPayload = JSON.stringify([
    {
      title: 'Task Test Tilte',
      description: 'Task Test Description',
      userId: 5,
      creationDate: '2020-05-10',
      updatedOn: '2020-05-10',
      dueDate: '2020-05-10',
      status: 'new'
    }
  ]);
  const options = {
    method: 'POST',
    url: '/tasks',
    payload: taskPayload
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should responds with 200 for tasks[PUT]', async function () {
  const taskPayload = JSON.stringify([
    {
      title: 'Task Test Tilte',
      description: 'Task Test Description',
      taskId: 9,
      dueDate: '2020-05-10',
      status: 'inProgress'
    }
  ]);
  const options = {
    method: 'PUT',
    url: '/tasks/9',
    payload: taskPayload
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should responds with 200 for tasks[DELETE]', async function () {
  const options = {
    method: 'DELETE',
    url: '/tasks/300'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

// Subtasks

test('should responds with 200 for sub-tasks/1 successfully', async function () {
  const options = {
    method: 'GET',
    url: '/sub-tasks/1'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should fail in adding subtasks due to no payload', async function () {
  const options = {
    method: 'POST',
    url: '/sub-tasks'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(500);
});

test('should fail in adding users due to no payload', async function () {
  const subTasksPayload = JSON.stringify([
    {
      title: 'Subtask Title1',
      description: 'Subtask Description1',
      dueDate: '2020-05-25',
      taskId: 9,
      creationDate: '2020-05-21'
    }
  ]);
  const options = {
    method: 'POST',
    url: '/sub-tasks',
    payload: subTasksPayload
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

//Users

test('should responds with 200 for users successfully', async function () {
  const options = {
    method: 'GET',
    url: '/users'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should responds with 200 for users/userName successfully', async function () {
  const options = {
    method: 'GET',
    url: '/users/srini1'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should fail in adding users due to no payload', async function () {
  const options = {
    method: 'POST',
    url: '/users'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(500);
});

test('should responds with 200 for /users[POST] successfully', async function () {
  const userPayload = JSON.stringify([
    {
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: '2020-05-10'
    }
  ]);
  const options = {
    method: 'POST',
    url: '/users',
    payload: userPayload
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

// Comments

test('should responds with 200 for comments/taskId successfully', async function () {
  const options = {
    method: 'GET',
    url: '/comments/1'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should fail in adding comments due to no payload', async function () {
  const options = {
    method: 'POST',
    url: '/comments'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(500);
});

test('should responds with 200 for comments[POST] successfully', async function () {
  const commentPayload = JSON.stringify([
    {
      commentTxt: 'Test comment for task 10',
      taskId: 10,
      commentDate: '2020-05-10'
    }
  ]);

  const options = {
    method: 'POST',
    url: '/comments',
    payload: commentPayload
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});
