const UserService = require('../../services/user-service');

module.exports = {
  method: 'POST',
  path: '/users',
  handler: async function (request, h) {
    const userService = new UserService();
    const payload = request.payload;
    const user = payload[0];
    console.log(payload);
    const userRes = await userService.addUser(user);
    return h.response(userRes);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
