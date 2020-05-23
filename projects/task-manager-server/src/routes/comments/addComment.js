const CommentService = require('../../services/comment-service');

module.exports = {
  method: 'POST',
  path: '/comments',
  handler: async function (request, h) {
    const payload = request.payload;
    const commentService = new CommentService();
    const comment = payload[0];
    let commentPayload = {
      commentTxt: comment.commentTxt,
      taskId: comment.taskId,
      commentDate: comment.commentDate
    };
    const commentRes = await commentService.addComment(commentPayload);
    console.log(commentRes);
    return h.response(commentRes);
  },
  options: {
    auth: false,
    tags: ['api'],
    description: 'Route to get tasks'
  }
};
