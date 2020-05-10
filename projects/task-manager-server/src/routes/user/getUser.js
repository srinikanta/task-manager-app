const Userervice = require('../../services/user-service');

module.exports = {
  method: 'GET',
  path: '/getUser/{id}',
  handler: async function(request, h) {
    
    const userId = request.params.id;
    const userService =  new Userervice();
    const user = await userService.getUser(userId);
    return h.response(user);

  },
  options: {
		auth: false,
		tags: ['api'],
		description: 'Route to get Status Types'
	}
}
