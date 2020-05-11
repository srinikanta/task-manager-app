const db = require('../helpers/database-helper');
const CommentsModel = require('../models/comments.model');

class CommentsService {
  async getComments(taskId) {
    const queryResponse = await CommentsModel.findAll({
      where: {
        taskId: taskId
      }
    });
    const result = [];
    for (let index = 0; index < queryResponse.length; index++) {
      result.push(queryResponse[index].dataValues);
    }
    return result;
  }

  async addComment(comment) {
    try {
      const nextTaskId = await db.connection.query(
        `SELECT nextval('task_comment_seq')`,
        { type: db.connection.QueryTypes.SELECT }
      );
      console.log(nextTaskId[0].nextval);
      const newCommentId = nextTaskId[0].nextval;
      const created = await CommentsModel.create({
        commentId: newCommentId,
        commentTxt: comment.commentTxt,
        taskId: comment.taskId,
        commentDate: comment.commentDate
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = CommentsService;
