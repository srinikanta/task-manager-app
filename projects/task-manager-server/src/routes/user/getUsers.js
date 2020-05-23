const Userervice = require('../../services/user-service');

module.exports = {
  method: 'GET',
  path: '/users',
  handler: async function (request, h) {
    const userService = new Userervice();
    const users = await userService.getUsers();
    return h.response(users);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get Status Types'
  }
};
