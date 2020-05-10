const db = require("../helpers/database-helper");
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Comments extends Model {
}

Comments.init({
  commentId: {
    type: Sequelize.INTEGER,
    field: 'task_comment_id',
    primaryKey: true
  },
  commentTxt: {
    type: Sequelize.TEXT,
    field: 'comment_data'
  },
  taskId: {
    type: Sequelize.INTEGER,
    field: 'task_id'
  },
  commentDate: {
    type: Sequelize.DATE,
    field: 'created_on'
  }
}, { sequelize: db.connection, modelName: 'taskComment', tableName: 'task_comment'});

module.exports = Comments;
