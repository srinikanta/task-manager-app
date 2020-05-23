const Userervice = require('../../services/user-service');

module.exports = {
  method: 'GET',
  path: '/users/{userName}',
  handler: async function (request, h) {
    const userName = request.params.userName;
    const userService = new Userervice();
    const user = await userService.getUser(userName);
    return h.response(user);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get Status Types'
  }
};
