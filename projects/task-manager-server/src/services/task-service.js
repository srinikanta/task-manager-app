const db = require('../helpers/database-helper');
const StatusTypesModel = require('../models/status-types.model');
const TasksModel = require('../models/tasks.model');
const SubTasksModel = require('../models/subtask.model');
const config = require('config');

class TaskService {
  async getTasksByUserId(userId) {
    const result = [];

    try {
      const queryResponse = await TasksModel.findAll({
        where: {
          userId: userId
        },
        attributes: [
          'taskId',
          'title',
          'description',
          'status',
          'creationDate',
          'dueDate',
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

  async getTasks() {
    const result = [];

    try {
      const queryResponse = await TasksModel.findAll({
        attributes: [
          'taskId',
          'title',
          'description',
          'status',
          'creationDate',
          'dueDate',
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

  async getStatusTypes() {
    const queryResponse = await StatusTypesModel.findAll({
      attributes: ['name', 'value']
    });
    const result = [];
    for (let index = 0; index < queryResponse.length; index++) {
      result.push(queryResponse[index].dataValues);
    }
    return result;
  }

  async addTask(task) {
    //const sqlQuery = `INSERT INTO task VALUES(nextval('task_seq'), );`;
    //const values = [task.title];

    try {
      //await db.connection.query(`SELECT nextval('task_seq')`, values);
      //TasksModel.create({})

      const nextTaskId = await db.connection.query(
        `SELECT nextval('task_seq')`,
        { type: db.connection.QueryTypes.SELECT }
      );
      console.log(nextTaskId[0].nextval);
      const newTaskId = nextTaskId[0].nextval;
      const created = await TasksModel.create({
        taskId: newTaskId,
        title: task.title,
        description: task.description,
        userId: task.userId,
        creationDate: task.creationDate,
        updatedOn: task.creationDate,
        dueDate: task.dueDate,
        status: task.status
      });
      console.log('created:::', created);
      return true;
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
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async updatedTask(task) {
    try {
      const queryResponse = await TasksModel.update(
        {
          description: task.description,
          status: task.status,
          dueDate: task.dueDate
        },
        {
          where: {
            taskId: parseInt(task.taskId)
          }
        }
      );
      console.log(queryResponse);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async removeTask(taskId) {
    const removedTask = await TasksModel.destroy({
      where: {
        taskId: taskId
      }
    });
    return removedTask;
  }
}

module.exports = TaskService;
