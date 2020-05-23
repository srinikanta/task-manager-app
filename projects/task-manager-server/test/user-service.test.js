const UserService = require('../src/services/user-service');

test('Test User Service getUsers', async function () {
  const userService = new UserService();
  const users = await userService.getUsers();
  expect(users.length).toBe(4);
});

test('Test User Service getUser', async function () {
  const userService = new UserService();
  const users = await userService.getUser('srini1');
  expect(users.length).toBe(1);
});

test('Test User Service getUser for wrong user', async function () {
  const userService = new UserService();
  const users = await userService.getUser('srini234');
  expect(users.length).toBe(0);
});

test('Test User Service getUser for null user', async function () {
  const userService = new UserService();
  const users = await userService.getUser();
  expect(users).toBe(false);
});

test('Test User Service add existing user returns the user', async function () {
  const userPayload = {
    userName: 'srini1',
    email: 'sri@sri.com',
    creationDate: '2020-05-10'
  };
  const userService = new UserService();
  const response = await userService.addUser(userPayload);
  expect(response[0].userName).toBe('srini1');
  expect(response[1]).toBe(false);
});

test('Test User Service add existing user returns the user1', async function () {
  const userPayload = {
    email: 'sri@sri.com',
    creationDate: '2020-05-10'
  };
  const userService = new UserService();
  const response = await userService.addUser(userPayload);
  expect(response).toBe(false);
});
