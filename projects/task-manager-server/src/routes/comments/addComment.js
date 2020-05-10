const CommentService = require('../../services/comment-service');

module.exports = {
  method: 'POST',
  path: '/addComment',
  handler: async function(request, h) {
    
    const payload = request.payload;
    const commentService =  new CommentService();
    let commentPayload = {
      commentTxt: payload.commentTxt,
      taskId: payload.taskId,
      commentDate: payload.commentDate
    }
    const comment = await commentService.addComment(commentPayload);
    console.log(comment)
    return h.response({});

  },
  options: {
		auth: false,
		tags: ['api'],
    description: 'Route to get tasks'
	}
}
