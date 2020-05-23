const CommentsModel = require('../src/models/comments.model');

test('Test Comments Model', async () => {
  const comments = await CommentsModel.findAll({
    where: {
      taskId: 9
    }
  });
  expect(comments.length).toBeGreaterThanOrEqual(0);
});
