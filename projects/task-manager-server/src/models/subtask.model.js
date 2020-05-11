const db = require('../helpers/database-helper');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class SubTasksModel extends Model {}

SubTasksModel.init(
  {
    subTaskId: {
      type: Sequelize.INTEGER,
      field: 'subtask_id',
      primaryKey: true
    },
    taskId: {
      type: Sequelize.INTEGER,
      field: 'task_id'
    },
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    creationDate: {
      type: Sequelize.DATE,
      field: 'created_on'
    },
    updatedOn: {
      type: Sequelize.DATE,
      field: 'last_updated_on'
    }
  },
  { sequelize: db.connection, modelName: 'subTask', tableName: 'subtask' }
);

module.exports = SubTasksModel;
