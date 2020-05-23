module.exports = {
  method: 'GET',
  path: '/',
  handler: async function (request, h) {
    return 'Hello World!';
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Server root path'
  }
};
