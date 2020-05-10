const UserService = require('../../services/user-service');

module.exports = {
  method: 'POST',
  path: '/addUser',
  handler: async function(request, h) {
    
    const userService =  new UserService();
    const payload = request.payload;
    console.log(payload);
    const user = await userService.addUser(payload);
    return h.response(user);

  },
  options: {
		auth: false,
		tags: ['api'],
		description: 'Route to get tasks'
	}
}
