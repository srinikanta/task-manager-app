const CommentsService = require('../src/services/comment-service');

test('Test Comments Service', async function () {
  const commentsService = new CommentsService();
  const comments = await commentsService.getComments(9);
  expect(comments.length).toBeGreaterThanOrEqual(0);
});

test('Test Comments Service Add Comment', async function () {
  const commentPayload = {
    commentTxt: 'Test comment for task 9',
    taskId: 9,
    commentDate: '2020-05-10'
  };
  const commentsService = new CommentsService();
  const comments = await commentsService.addComment(commentPayload);
  expect(comments.dataValues.commentTxt).toBe('Test comment for task 9');
});

test('Test Comments Service Add Comment error', async function () {
  const commentPayload = {
    commentTxt: 'Test comment for task 9',
    taskId: null,
    commentDate: '2020-05-10'
  };
  const commentsService = new CommentsService();
  const comments = await commentsService.addComment(commentPayload);
  expect(comments).toBe(false);
});
