const db = require('../helpers/database-helper');
const SubTasksModel = require('../models/subtask.model');
const config = require('config');

class SubTaskService {
  async getSubTasks(taskId) {
    const result = [];

    try {
      const queryResponse = await SubTasksModel.findAll({
        where: {
          taskId: taskId
        },
        attributes: [
          'subTaskId',
          'taskId',
          'title',
          'description',
          'creationDate',
          'updatedOn'
        ]
      });

      for (let index = 0; index < queryResponse.length; index++) {
        result.push(queryResponse[index].dataValues);
      }

      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async addSubTask(subTask) {
    try {
      const nextTaskId = await db.connection.query(
        `SELECT nextval('subtask_seq')`,
        { type: db.connection.QueryTypes.SELECT }
      );
      console.log(nextTaskId[0].nextval);
      const newSubTaskId = nextTaskId[0].nextval;
      const created = await SubTasksModel.create({
        subTaskId: newSubTaskId,
        title: subTask.title,
        description: subTask.description,
        taskId: subTask.taskId,
        creationDate: subTask.creationDate,
        updatedOn: subTask.creationDate
      });
      return created;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = SubTaskService;
