const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());
const UserModel = require('../src/models/user.model');
const UserService = require('../src/services/user-service');

describe('Test User Model', function () {
  it('should do something', async function () {
    const queryResponse = await UserModel.findAll({
      where: {
        userName: 'srini1'
      }
    });
    expect(queryResponse.length).to.equal(1);
  });
});

describe('Test User Model for wrong user', function () {
  it('should do something', async function () {
    const queryResponse = await UserModel.findAll({
      where: {
        userName: 'srini1111'
      }
    });
    expect(queryResponse.length).to.equal(0);
  });
});

describe('Test User Service getUsers', function () {
  it('should do something', async function () {
    const userService = new UserService();
    const users = await userService.getUsers();
    expect(users.length).to.equal(4);
  });
});

describe('Test User Service getUser', function () {
  it('should do something', async function () {
    const userService = new UserService();
    const user = await userService.getUser('srini1');
    expect(user.length).to.equal(1);
  });
});

describe('Test User Service getUser for wrong user', function () {
  it('should do something', async function () {
    const userService = new UserService();
    const user = await userService.getUser('srini111');
    expect(user.length).to.equal(0);
  });
});

describe('Test User Service addUser error', function () {
  it('should do something', async function () {
    const userPayload = JSON.stringify({
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: '2020-05-10'
    });
    const userService = new UserService();
    const response = await userService.addUser(userPayload);
    expect(response).to.equal(false);
  });
});

describe('Test User Service addUser for exising user should return the user', function () {
  it('should do something', async function () {
    const userPayload = {
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: '2020-05-10'
    };
    const userService = new UserService();
    const response = await userService.addUser(userPayload);
    //console.log(response[1]);
    //console.log(response.isNewRecord);
    expect(response[0].isNewRecord).to.equal(false);
    expect(response[1]).to.equal(false);
  });
});
