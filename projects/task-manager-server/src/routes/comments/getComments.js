const CommentService = require('../../services/comment-service');

module.exports = {
  method: 'GET',
  path: '/comments/{id}',
  handler: async function (request, h) {
    const taskId = request.params.id;
    const commentService = new CommentService();
    const comments = await commentService.getComments(taskId);
    return h.response(comments);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get comments'
  }
};
