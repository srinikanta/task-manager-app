const UserModel = require('../src/models/user.model');

test('should do something', async function () {
  const queryResponse = await UserModel.findAll({
    where: {
      userName: 'srini1'
    }
  });
  expect(queryResponse.length).toBe(1);
});

test('Test User Model for wrong user', async function () {
  const queryResponse = await UserModel.findAll({
    where: {
      userName: 'srini1111'
    }
  });
  expect(queryResponse.length).toBe(0);
});
