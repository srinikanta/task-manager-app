'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');

describe('GET /', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200 with /statusTypes', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/statusTypes'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /tasks', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/tasks'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /addTask', async () => {
    const taskPayload = JSON.stringify({
      title: 'Task Test Tilte',
      description: 'Task Test Description',
      userId: 5,
      creationDate: '2020-05-10',
      updatedOn: '2020-05-10',
      dueDate: '2020-05-10',
      status: 'new'
    })

    const res = await server.inject({
      method: 'POST',
      url: '/addTask',
      payload: taskPayload
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /tasksByUserId', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/tasksByUserId/1'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /subTasks/{id}', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/subTasks/1'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /getUser/{name}', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/getUser/test1'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /getUsers', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/getUsers'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /comments/{id}', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/comments/1'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with false with /addComment', async () => {
    const commentPayload = JSON.stringify({
      commentTxt: 'Test comment for task 10',
      taskId: 10,
      commentDate: '2020-05-10'
    })

    const res = await server.inject({
      method: 'POST',
      url: '/addComment',
      payload: commentPayload
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /addUser', async () => {
    const userPayload = JSON.stringify({
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: '2020-05-10'
    })

    const res = await server.inject({
      method: 'POST',
      url: '/addUser',
      payload: userPayload
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 200 with /addUser', async () => {
    const userPayload = JSON.stringify({
      userName: null,
      email: null,
      creationDate: null
    })

    const res = await server.inject({
      method: 'POST',
      url: '/addUser',
      payload: userPayload
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with false with /addUser with null', async () => {
    const userPayload = JSON.stringify({
      userName: null,
      email: null,
      creationDate: null
    })

    const res = await server.inject({
      method: 'POST',
      url: '/addUser',
      payload: userPayload
    });

    expect(res.result).to.equal(false);
  });

});