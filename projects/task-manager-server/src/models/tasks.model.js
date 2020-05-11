const db = require('../helpers/database-helper');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class TasksModel extends Model {}

TasksModel.init(
  {
    taskId: {
      type: Sequelize.INTEGER,
      field: 'task_id',
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    status: Sequelize.STRING,
    creationDate: {
      type: Sequelize.DATE,
      field: 'created_on',
      defaultValue: Sequelize.NOW
    },
    dueDate: {
      type: Sequelize.DATE,
      field: 'due_date'
    },
    updatedOn: {
      type: Sequelize.DATE,
      field: 'last_updated_on'
    }
  },
  { sequelize: db.connection, modelName: 'task', tableName: 'task' }
);

module.exports = TasksModel;
