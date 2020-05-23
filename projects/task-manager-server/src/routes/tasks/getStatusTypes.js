const StatusService = require('../../services/status-service');

module.exports = {
  method: 'GET',
  path: '/status-types',
  handler: async function (request, h) {
    const statusService = new StatusService();
    const statusTypes = await statusService.getStatusTypes();
    return h.response(statusTypes);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get Status Types'
  }
};
